'use strict';

// Extract the authentication logic for /signin as middleware
// Create a new node module
// Interact with the headers and the users model
// Add the user record (if valid) to the request object and call next()
// Call next() with an error in the event of a bad login

// const bcrypt = require('bcrypt')
const base64 = require('base-64');
const User = require('../models/user-schema.js');

async function basicAuth(req, res, next) {
  
  let basicAuthComponents = req.headers.authorization.split(' ');

  let encoded = basicAuthComponents.pop();
  let decoded = base64.decode(encoded);

  let [username, password] = decoded.split(':');
  
  let validUser = await User.authenticateUser(username, password);
  next();
};

module.exports = basicAuth;