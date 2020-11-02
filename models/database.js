const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  id: String,
  url: String,
  hash: String
});

module.exports = URL = mongoose.model('URL', urlSchema);