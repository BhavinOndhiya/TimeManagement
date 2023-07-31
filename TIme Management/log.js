const fs = require('fs');

// Function to log messages to app.log file
function logMessage(message) {
  const logEntry = `${new Date().toISOString()}: ${message}\n`;

  fs.appendFile('app.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to app.log:', err);
    }
  });
}

module.exports = logMessage;
