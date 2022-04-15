const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    id_quiz: { type: mongoose.ObjectId, ref: 'Quiz', required: true },
    title: { type: String, required: true },
    choices: [{ type: mongoose.ObjectId, ref: 'Choice', required: true }],
    explanation: String,
    link_to_learn_more: String
    })

module.exports = mongoose.model('Question', questionSchema);