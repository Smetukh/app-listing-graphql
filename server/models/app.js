const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appSchema = new Schema({
  name: String,
  // genre: String,
  // directorId: String,
  // rate: Number,
  // watched: Boolean,
});

module.exports = mongoose.model('App', appSchema);
