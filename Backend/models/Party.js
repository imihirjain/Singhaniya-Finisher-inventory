// models/Party.js

const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Party', partySchema);
