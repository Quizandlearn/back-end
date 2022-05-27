const mongoose = require('mongoose');
// import Contact from './contact';
// import Completion from './completion';
// import Quiz from './quiz';
// import Rating from './rating';
// import Reporting from './reporting';

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // photo: String,
    // contacts: [Contact],
    // roles: {
    //   type: String,
    //   enum : ['user','admin'],
    //   default: 'user'
    // },
    favorite_quizzes: [{ type: mongoose.ObjectId, ref: 'Quiz' }],
    created_quizzes: [{ type: mongoose.ObjectId, ref: 'Quiz' }],
    // completions: [Completion],
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
