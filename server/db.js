const neo4j = require('neo4j-driver');
require('dotenv').config({ path: __dirname + '/.env' });

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

async function getSession() {
    return driver.session();
}

async function verifyConnectivity() {
    try {
        await driver.verifyConnectivity();
        console.log('Successfully connected to Neo4j');
    } catch (error) {
        console.error('Error connecting to Neo4j', error);
    }
}

module.exports = {
    driver,
    getSession,
    verifyConnectivity
};
