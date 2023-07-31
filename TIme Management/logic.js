const { parseExpression } = require('cron-parser');

const people = ['Abhishek', 'Vatsal', 'Bhavin', 'Vismit'];
const timeSlots = ['7:00 AM - 7:30 AM', '7:30 AM - 8:00 AM', '8:00 AM - 8:30 AM', '8:30 AM - 9:00 AM'];

function getCurrentTimeSlotIndex() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  let timeSlotIndex = (hour - 7) * 2;

  if (minute >= 30) {
    timeSlotIndex += 1;
  }

  return timeSlotIndex;
}

function rotatePeople(peopleArr, rotations) {
  for (let i = 0; i < rotations; i++) {
    const lastPerson = peopleArr.pop();
    peopleArr.unshift(lastPerson);
  }
}

async function getParticipantEmails() {
  // Here, you can replace this section with your Neo4j database queries to fetch participants' emails.
  // For this example, I'll mock the data and return the emails directly.

  // Mocked participant data with emails
  const participants = [
    { name: "Abhishek", email: "joshiabhi866@gmail.com" },
    { name: "Vismit", email: "vismitmandlik@gmail.com" },
    { name: "Bhavin", email: "cminati826@gmail.com" },
    { name: "Vatsal", email: "vatsalrathodd@gmail.com" },
  ];

  return participants.map(participant => participant.email);
}

async function sendEmailMessage(message, recipientEmails, mailTransporter) {
  const mailOptions = {
    from: mailTransporter.options.auth.user,
    to: recipientEmails.join(','),
    subject: 'Your Daily Schedule',
    text: message,
  };

  mailTransporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

async function scheduleDailyMessage(mailTransporter) {
  const timeSlotIndex = getCurrentTimeSlotIndex();
  rotatePeople(people, timeSlotIndex);

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const participantEmails = await getParticipantEmails();

  const messages = people.map((person, i) => {
    const assignedTimeSlot = timeSlots[i];
    return `Good morning, ${person}! 🌞 Today (${date}), your time slot is: ${assignedTimeSlot}`;
  });

  sendEmailMessage(messages.join('\n\n'), participantEmails, mailTransporter);
}

// Exporting the scheduleDailyMessage function to use it in the app.js file
module.exports = { scheduleDailyMessage };
