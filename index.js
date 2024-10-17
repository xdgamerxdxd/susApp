const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
require("dotenv").config();
const zpuzzle = require('./functions/zpuzzle');
const users = require('./models/users');
const userFunc = require('./functions/user')

//MIDDLEWARE

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.sendFile(__dirname + '/public/titlescrn.html');
    return;
  }
  jwt.verify(token, 'sussy', (err) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    } else {
      res.redirect('/loggedin');
    }
  });
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/loggedin', (req, res) => {
  const username = req.cookies.username;

  if (!username) {
    res.redirect('/');
    return;
  }
  jwt.verify(username, 'sussy', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
    } 
    
    return res.sendFile(path.join(__dirname, 'public' ,'loggedin.html'));
    
  });
});

app.get('/reset', (req, res) => {
  res.sendFile(__dirname + '/public/reset.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/public/repuzzle.html');
});

app.get ('/leaderboard', (req, res) => {
  res.sendFile(__dirname + '/public/leaderboard.html');
});

// Route to get the logged-in user's username
app.get('/username', (req, res) => {
  const username = req.cookies.username;

  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(username, 'sussy', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    return res.json({ username: decoded.username });
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

app.use(zpuzzle);

app.use(userFunc)

users.sync();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`myApp listening on port ${port}`);
});
