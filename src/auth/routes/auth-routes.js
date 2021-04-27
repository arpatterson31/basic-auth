'use strict';

const express = require('express');
const User = require('../models/user-schema.js');
const basicAuth = require('../middleware/basicAuth.js');

const authRouter = express.Router();


// // Signup Route -- create a new user
authRouter.post('/signup', newSignUp);

async function newSignUp(req, res, next) {
  try {
    const user = new User(req.body);
    const record = await user.save();
    res.status(201).json(record);
  }
  catch (e) { res.status(403).send(e.message); }
};


// // Signin Route -- login with username and password
authRouter.post('/signin', basicAuth, newSignIn);
async function newSignIn(req, res) {
  // Use your basic authentication middleware to perform the actual login task 
  // When validated, send a JSON object as the response with the following properties:
  // user: The users' database record
  res.status(200).json({ 'user': res.user });
};



module.exports = authRouter;