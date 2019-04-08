const mongoose = require('mongoose'); // Importing mongoose node module

const Schema = mongoose.Schema; // Instantiates Schema class from mongoose
const userSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('user', userSchema, 'users'); // Exports 'user' defined by 'userSchema' to 'users' MongoDB collection
