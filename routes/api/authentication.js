const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();

// configure mongoose promise
mongoose.Promise = global.Promise;

// GET to /checksession
router.get('/checksession', (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// POST to /login
router.post('/login', async (req, res) => {
  // look up the user by their email
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // if they exists, they'll have a username, so add that to the body
  if (foundUser) {
    req.body.username = foundUser.username;
  }
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should should have user info to send back
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }

    // Otherwise return an error
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
});

// POST to /register
router.post('/register', async (req, res) => {
  // First, check and make sure the email doesn't aready exist
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  if (foundUser) {
    return res.send(JSON.stringify({ error: 'Email or username already exists.' }));
  }
  if (!foundUser) {
    // Create a user object to save, using values from incoming JSON
    const newUser = new User(req.body);

    // Save, via Passport's "register" method, the user
    return User.register(newUser, req.body.password, (err) => {
      // If there's a problem, send back a JSON object with the error
      if (err) {
        return res.send(JSON.stringify({ error: err }));
      }
      // Otherwise log them in
      return passport.authenticate('local')(req, res, () => {
        // If logged in, we should have user info to send back
        if (req.user) {
          return res.send(JSON.stringify(req.user));
        }
        // Otherwise return an error
        return res.send(JSON.stringify({ error: 'There was an error registering the user.' }));
      });
    });
  }

  // return an error if all else fails
  return res.send(JSON.stringify({ error: 'There was an error registering the user.' }));
});

// POST to saveresethash
router.post('/saveresethash', async (req, res) => {
  let result;
  try {
    // check and make sure the email exists
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    // if the user exists, save their password hash
    const timeInMs = Date.now();
    const hashString = `${req.body.email}${timeInMs}`;
    const secret = 'somelongrandomstringhere';
    const hash = crypto.createHmac('sha256', secret)
      .update(hashString)
      .digest('hex');
    foundUser.passwordReset = hash;
    foundUser.save((err) => {
      if (err) {
        result = res.send(JSON.stringify({
          error: 'Something went wrong while attempting to reset the password. Please try again.',
        }));
      }
      result = res.send(JSON.stringify({ success: true }));
    });
  } catch (e) {
    // if the user doesn't exist, error out
    result = res.send(JSON.stringify({
      error: 'Something went wrong while attempting to reset the password. Please try again.',
    }));
  }
  return result;
});

module.exports = router;
