const mongoose = require('mongoose');

const choiceSchema = mongoose.Schema({
  id_question: { type: mongoose.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

module.exports = mongoose.model('Choice', choiceSchema);
