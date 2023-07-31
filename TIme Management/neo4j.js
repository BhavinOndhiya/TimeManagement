const neo4j = require('neo4j-driver');

// Set up the Neo4j credentials
const neo4jUri = process.env.NEO4J_URI;
const neo4jUsername = process.env.NEO4J_USERNAME;
const neo4jPassword = process.env.NEO4J_PASSWORD;

// Create a new Neo4j driver instance
const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUsername, neo4jPassword));

// Function to get a Neo4j session for executing queries
function getNeo4jSession() {
  return driver.session();
}

// Export the function and driver for use in other modules
module.exports = { getNeo4jSession, driver };
