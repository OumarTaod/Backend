const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  cours: { type: String, required: true },
  etudiant: { type: String, required: true },
  note: { type: String, required: true },
  professeur: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);