const express = require('express');
const app = express();
const cron = require('node-cron');
const { parseExpression } = require('cron-parser');
const nodemailer = require('nodemailer');
const logic = require('./logic'); // Include the logic.js file

const PORT = 3000;

// Email configuration
const emailUser = '21ce083@charusat.edu.in'; // Replace with your email address
const emailPass = 'bhavin567'; // Replace with your email password
const mailTransporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service provider (e.g., 'Gmail', 'Outlook', etc.)
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Schedule daily message at 7:00 AM using cron-parser
const cronExpression = '0 7 * * *';
const options = {
  tz: 'Asia/Kolkata', // Adjust timezone as needed
};

const interval = parseExpression(cronExpression, options);

const job = setInterval(() => {
  const nextDate = interval.next().toString();
  const now = new Date().toString();

  // Check if the next scheduled date is in the future (to avoid running multiple times if the application starts late)
  if (nextDate > now) {
    logic.scheduleDailyMessage(mailTransporter);
  }
}, 60000); // Check every minute

// Call scheduleDailyMessage immediately on startup
logic.scheduleDailyMessage(mailTransporter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
