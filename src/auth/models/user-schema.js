'use strict';

const mongoose = require('mongoose');

// Extract the mongo/schema into a separate module
// Model the user data

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}); 

// Add a pre-save hook in the model … Before we save a record:
// Hash the plain text password given before you save a user to the database

// Create a method in the schema to authenticate a user using the hashed password

const User = mongoose.model('user', userSchema);

module.exports = User;