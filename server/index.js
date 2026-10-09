const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config({ path: __dirname + '/.env' });

const { verifyConnectivity } = require('./db');
const analyticsController = require('./controllers/analytics');

const app = express();

app.use(cors());
app.use(express.json({ type: ['application/json', 'text/plain'] }));

// Analytics Track Endpoint
app.post('/api/analytics/event', analyticsController.trackEvent);

// Analytics Dashboard Endpoints
app.get('/api/analytics/dashboard/overview', analyticsController.getOverview);
app.get('/api/analytics/dashboard/popular-pages', analyticsController.getPopularPages);
app.get('/api/analytics/dashboard/navigation', analyticsController.getNavigationPaths);
app.get('/api/analytics/dashboard/sessions/:id', analyticsController.getSessionJourney);

const PORT = process.env.PORT || 5001;

verifyConnectivity().then(() => {
    app.listen(PORT, () => {
        console.log(`Analytics API Server running on port ${PORT}`);
    });
});
