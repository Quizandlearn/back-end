const Answer = require('../models/answer');

exports.postAnswer = async (req, res) => {
  try {
    const createQuiz = await new Answer({
      id_quiz: req.body.id_quiz,
      id_user_answered: req.body.id_user_answered,
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      questions: req.body.questions,
      percentage_right_answers: req.body.percentage_right_answers,
    });
    await createQuiz.save();
    res.status(200).send({ message: 'Réponse ajoutée', idQuiz: createQuiz._id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
