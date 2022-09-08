const Quiz = require('../models/quiz');

exports.postQuiz = async (req, res) => {
  try {
    const createQuiz = await new Quiz({
      id_user_owner: req.body.id_user_owner,
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      questions: req.body.questions,
      status: req.body.status,
    });
    await createQuiz.save();
    res.status(200).send({ message: 'Quiz créé', idQuiz: createQuiz._id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getQuizzes = async (req, res, next) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);
  const skipIndex = (page - 1) * limit;

  try {
    const quizNb = await Quiz.count();
    const totalPages = Math.ceil(quizNb / limit);
    if (limit > quizNb || page > totalPages) {
      res.status(400).send('invalid request in quantity');
    } else {
      const quizzes = await Quiz.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.status(200).send({
        quizzes, currentPage: page, totalPages, numberQuizzes: quizNb,
      });
      next();
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Sert à récupérer la data du quiz pour l'afficher à l'utilisateur
// qui veut répondre dans un second temps au quiz
exports.getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    res.status(200).send({
      quiz,
    });
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
