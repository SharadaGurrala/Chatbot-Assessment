const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getResponseFromBot } = require('./botService'); // Make sure to create this service

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple root route to verify the server is running
app.get('/', (req, res) => {
  res.send('Chatbot backend is running!');
});

// API route for handling chatbot messages
app.post('/api/messages', (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  // Get the response from the chatbot (using a function like getResponseFromBot)
  getResponseFromBot(userMessage)
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      console.error('Error getting response:', error);
      res.status(500).json({ error: 'Something went wrong with the bot' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
