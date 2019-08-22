const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const androidSchema = new Schema({
  build: String,
  bundleId: String,
  dateExpired: String,
  dateModified: String,
  fileLink: String,
  fileName: String,
  name: String,
  fileSize: Number,
  iconLink: String,
  installLink: String,
  qrCode: String,
  team: String,
  timestamp: Number,
  version: String,
});

module.exports = mongoose.model('Android', androidSchema);
