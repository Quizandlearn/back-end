const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const quizSchema = mongoose.Schema(
  {
    id_user_owner: { type: mongoose.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: mongoose.ObjectId, ref: 'Category' }],
    questions: [{ type: mongoose.ObjectId, ref: 'Question' }],
    status: Number,
    ratings: [{ type: mongoose.ObjectId, ref: 'Rating' }],
    reportings: [{ type: mongoose.ObjectId, ref: 'Reporting' }],
  },
  {
    timestamps: true,
  },
);

quizSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Quiz', quizSchema);
