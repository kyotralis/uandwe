const { getSession } = require('../db');
const { v4: uuidv4 } = require('uuid');

async function trackEvent(req, res) {
    const event = req.body;
    
    if (!event || Object.keys(event).length === 0) {
        return res.status(400).json({ error: 'Empty request body' });
    }

    // required fields
    if (!event.session_id || !event.event_type || !event.page_url) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const event_id = uuidv4();
    const timestamp = event.timestamp || new Date().toISOString();

    let session;
    try {
        session = await getSession();
        // Cypher Query to create/merge Session, Page, and Event nodes and link them
        const query = `
            // Merge Session
            MERGE (s:Session { id: $session_id })
            ON CREATE SET s.os = $os, s.browser = $browser, s.device_type = $device_type, s.created_at = $timestamp
            
            // Merge User if user_id is provided
            FOREACH (ignoreMe IN CASE WHEN $user_id IS NOT NULL THEN [1] ELSE [] END |
                MERGE (u:User { id: $user_id })
                MERGE (u)-[:HAS_SESSION]->(s)
            )

            // Merge Page
            MERGE (p:Page { url: $page_url })
            ON CREATE SET p.title = $page_title

            // Merge Previous Page if exists
            FOREACH (ignoreMe IN CASE WHEN $previous_page IS NOT NULL THEN [1] ELSE [] END |
                MERGE (prev_p:Page { url: $previous_page })
            )
            
            // Create Event
            CREATE (e:Event { 
                id: $event_id, 
                type: $event_type, 
                timestamp: $timestamp, 
                duration: $duration,
                metadata: $metadata 
            })
            
            // Link Event to Session and Page
            CREATE (s)-[:PERFORMED]->(e)
            CREATE (e)-[:ON_PAGE]->(p)

            // Optional: Navigated To relationship for page views
            WITH s, e, p
            CALL {
                WITH s, e, p
                MATCH (s)-[:PERFORMED]->(prev:Event)
                WHERE prev.timestamp < $timestamp AND prev.id <> $event_id
                WITH prev ORDER BY prev.timestamp DESC LIMIT 1
                CREATE (prev)-[:NEXT_EVENT]->(e)
                WITH prev
                // If it's a PAGE_VIEW, we can create a direct graph for paths
                OPTIONAL MATCH (prev)-[:ON_PAGE]->(prev_p:Page)
                WHERE $event_type = 'PAGE_VIEW' AND prev.type = 'PAGE_VIEW'
                FOREACH (ignoreMe IN CASE WHEN prev_p IS NOT NULL THEN [1] ELSE [] END |
                    MERGE (prev_p)-[nav:NAVIGATED_TO]->(p)
                    ON CREATE SET nav.count = 1
                    ON MATCH SET nav.count = nav.count + 1
                )
            }
            RETURN e
        `;

        const params = {
            session_id: event.session_id,
            user_id: event.user_id || null,
            os: event.os || 'Unknown',
            browser: event.browser || 'Unknown',
            device_type: event.device_type || 'Unknown',
            event_id: event_id,
            event_type: event.event_type,
            page_url: event.page_url,
            page_title: event.page_title || '',
            previous_page: event.previous_page || null,
            timestamp: timestamp,
            duration: event.duration || 0,
            metadata: event.metadata ? JSON.stringify(event.metadata) : null
        };

        await session.run(query, params);
        res.status(201).json({ success: true, event_id });
    } catch (error) {
        console.error('Error recording event:', error);
        require('fs').appendFileSync(__dirname + '/../error.log', error.stack + '\n');
        res.status(500).json({ error: 'Internal Server Error', details: error.message || error.toString() });
    } finally {
        if (session) await session.close();
    }
}

// Dashboard APIs
async function getOverview(req, res) {
    const session = await getSession();
    try {
        const query = `
            CALL { MATCH (e:Event {type: 'SESSION_START'}) RETURN count(e) as totalSessions }
            CALL { MATCH (s:Session) RETURN count(s) as totalUsers }
            CALL { MATCH (e:Event {type: 'PAGE_VIEW'}) RETURN count(e) as totalPageViews }
            CALL { MATCH (e:Event {type: 'PAGE_EXIT'}) RETURN avg(e.duration) as avgDuration }
            RETURN totalSessions, totalUsers, totalPageViews, coalesce(avgDuration, 0.0) as avgDuration
        `;
        const result = await session.run(query);
        const record = result.records[0];
        res.json({
            totalSessions: record.get('totalSessions').toNumber(),
            totalUsers: record.get('totalUsers').toNumber(),
            totalPageViews: record.get('totalPageViews').toNumber(),
            avgDuration: record.get('avgDuration') ? record.get('avgDuration') : 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await session.close();
    }
}

async function getPopularPages(req, res) {
    const session = await getSession();
    try {
        const query = `
            MATCH (p:Page)
            OPTIONAL MATCH (e:Event {type: 'PAGE_VIEW'})-[:ON_PAGE]->(p)
            WITH p, count(e) as views
            OPTIONAL MATCH (exit:Event {type: 'PAGE_EXIT'})-[:ON_PAGE]->(p)
            WITH p, views, avg(exit.duration) as avgDuration
            WHERE views > 0
            RETURN p.url as url, p.title as title, views, coalesce(avgDuration, 0.0) as avgDuration
            ORDER BY views DESC LIMIT 10
        `;
        const result = await session.run(query);
        const pages = result.records.map(record => {
            const rawAvg = record.get('avgDuration');
            const avgDuration = (rawAvg && rawAvg.toNumber) ? rawAvg.toNumber() : Number(rawAvg) || 0;
            return {
                url: record.get('url'),
                title: record.get('title'),
                views: record.get('views').toNumber(),
                avgDuration: avgDuration
            };
        });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await session.close();
    }
}

async function getSessionJourney(req, res) {
    const session_id = req.params.id;
    const session = await getSession();
    try {
        const query = `
            MATCH (s:Session {id: $session_id})-[:PERFORMED]->(e:Event)-[:ON_PAGE]->(p:Page)
            RETURN e.id as id, e.type as type, e.timestamp as timestamp, e.duration as duration, p.url as url, p.title as title
            ORDER BY e.timestamp ASC
        `;
        const result = await session.run(query, { session_id });
        const journey = result.records.map(record => ({
            id: record.get('id'),
            type: record.get('type'),
            timestamp: record.get('timestamp'),
            duration: record.get('duration').toNumber(),
            url: record.get('url'),
            title: record.get('title')
        }));
        res.json(journey);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await session.close();
    }
}

async function getNavigationPaths(req, res) {
    const session = await getSession();
    try {
        const query = `
            MATCH (p1:Page)-[nav:NAVIGATED_TO]->(p2:Page)
            RETURN p1.url as fromUrl, p2.url as toUrl, nav.count as count
            ORDER BY count DESC LIMIT 10
        `;
        const result = await session.run(query);
        const paths = result.records.map(record => ({
            from: record.get('fromUrl'),
            to: record.get('toUrl'),
            count: record.get('count').toNumber()
        }));
        res.json(paths);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await session.close();
    }
}

module.exports = {
    trackEvent,
    getOverview,
    getPopularPages,
    getSessionJourney,
    getNavigationPaths
};
