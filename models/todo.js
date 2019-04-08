const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  todo: String,
  complete: Boolean,
  priority: Number
});

module.exports = mongoose.model('todo', userSchema, 'todos');
