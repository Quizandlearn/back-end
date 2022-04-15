const Quiz = require('../models/quiz');
const Category = require('../models/category');

exports.postQuiz = async (req, res, next) => {

    const createQuiz = await new Quiz({...req.body})
    if(createQuiz){
      res.status(200).send({ message: 'Quiz créé' });
      createQuiz.save();
    }
    else{
      res.status(400).send({ message: 'Les paramètres ne sont pas valides' });
    }
  }
  