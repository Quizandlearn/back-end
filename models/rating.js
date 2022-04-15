const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    id_user:  {type: mongoose.ObjectId, ref: 'User'},
    id_quiz: {type: mongoose.ObjectId, ref: 'Quiz'},
    nb_stars: Number,
  })

module.exports = mongoose.model('Rating', ratingSchema);