const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const quizInUserSchema = mongoose.Schema({
  id_quiz: { type: mongoose.ObjectId, ref: 'Quiz' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: String }],
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_quizzes: [quizInUserSchema],
    answered_quizzes: [quizInUserSchema],
    favorite_quizzes: [quizInUserSchema],
    ratings: [{ type: mongoose.ObjectId, ref: 'Rating' }],
    reportings: [{ type: mongoose.ObjectId, ref: 'Reporting' }],
  },
  {
    timestamps: true,
  },
);

// grâce à ce plugin : solution à problème
userSchema.plugin(uniqueValidator);

// ce module s'appellera 'User'
module.exports = mongoose.model('User', userSchema);
