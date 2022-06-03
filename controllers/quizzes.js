const Quiz = require('../models/quiz');

exports.postQuiz = async (req, res) => {
  try {
    const createQuiz = await new Quiz({
      id_user_owner: req.body.id_user_owner,
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
    });
    await createQuiz.save();
    res.status(200).send({ message: 'Quiz créé', idQuiz: createQuiz._id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
