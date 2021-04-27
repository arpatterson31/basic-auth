'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Extract the mongo/schema into a separate module
// Model the user data

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Add a pre-save hook in the model … Before we save a record:
// Hash the plain text password given before you save a user to the database
// from mongoose docs
// const schema = new Schema(..);
// schema.pre('save', function(next) {
//   // do stuff
//   next();
// });

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next(); //TODO - did i do this right?
})

// Create a method in the schema to authenticate a user using the hashed password
// Schema.method() adds instance methods to the Schema.methods object. You can also add instance methods directly to the Schema.methods

userSchema.statics.authenticateUser = async function (un, pw) {
  const user = await this.findOne({ username: un })
  console.log('user', user);
  const valid = await bcrypt.compare(pw, user.password);
  console.log('valid', valid);
  if (valid) {
    return user;
  }
  else {
    throw new Error('Invalid User')
  }
} 


const User = mongoose.model('user', userSchema);

module.exports = User;