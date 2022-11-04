const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const answerSchema = mongoose.Schema(
  {
    id_quiz: { type: mongoose.ObjectId, required: true },
    id_user_answered: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String }],
    questions: [{
      title: { type: String, required: true },
      choices: [{
        content: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        isChecked: { type: Boolean, required: true },
      }],
      explanation: String,
      link_to_learn_more: String,
    }],
    percentage_right_answers: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
  ,
);
answerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Answer', answerSchema);
