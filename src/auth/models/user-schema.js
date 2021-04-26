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
// from mongoose docs
// const schema = new Schema(..);
// schema.pre('save', function(next) {
//   // do stuff
//   next();
// });

userSchema.pre('save', async function (next) {
  let hashed = await bcrypt.hash(userSchema.password, 10); //TODO - did i do this right?
  next();
})

// Create a method in the schema to authenticate a user using the hashed password
// Schema.method() adds instance methods to the Schema.methods object. You can also add instance methods directly to the Schema.methods

userSchema.methods.authenticateUser = async function (password) {
  const valid = await bcrypt.compare(password, hashed); //TODO - did i do this right?

}

const User = mongoose.model('user', userSchema);

module.exports = User;