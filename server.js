const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const app = express();

let counter = 0;
let uniqueUsers = new Set();

app.use(express.static(path.join(__dirname, 'public')));

// Use cors middleware
app.use(cors());

app.use((req, res, next) => {
  const userIP = req.ip;

  if (!uniqueUsers.has(userIP)) {
    // Increment the counter only if it's a new user
    counter++;
    uniqueUsers.add(userIP);
    console.log(`New user detected. Counter incremented to ${counter}`);
  }

  next();
});

app.get('/counter', (req, res) => {
  res.json({ counter });
});

// Add a new route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
