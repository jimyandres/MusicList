const express = require('express');
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();

// POST to /register
router.post('/register', (req, res) => {
  // Create a user object to save, using values from incoming JSON
  const newUser = new User(req.body);

  // Save, via Passport's "register" method, the user
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      return res.send(JSON.stringify({ errro: err }));
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });
});

module.exports = router;
