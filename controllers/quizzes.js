const Quiz = require('../models/quiz');

exports.postQuiz = async (req, res) => {
  const createQuiz = await new Quiz({ ...req.body });
  if (createQuiz) {
    res.status(200).send({ message: 'Quiz créé' });
    await createQuiz.save();
  } else {
    res.status(400).send({ message: 'Les paramètres ne sont pas valides' });
  }
};

exports.getQuiz = async (req, res) => {
  const quizzes = await Quiz.find();
  if (quizzes) {
    res.status(200).send(quizzes);
  } else {
    res.status(400).send({ message: 'Quizzes non trouvées' });
  }
};
