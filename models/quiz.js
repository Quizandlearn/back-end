const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const quizSchema = mongoose.Schema(
  {
    id_user_owner: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: String }],
    questions: [{
      title: { type: String, required: true },
      choices: [{
        content: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      }],
      explanation: String,
      link_to_learn_more: String,
    }],
    status: Number,
    ratings:
      [{
        id_user: { type: mongoose.ObjectId, ref: 'User' },
        nb_stars: Number,
      }],
    reportings:
      [{
        id_user: { type: mongoose.ObjectId, ref: 'User' },
        type: [String],
        status: 'opened' || 'in progress' || 'closed',
      },
      {
        timestamps: true,
      }],
  },
  {
    timestamps: true,
  }
  ,
);
quizSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Quiz', quizSchema);
