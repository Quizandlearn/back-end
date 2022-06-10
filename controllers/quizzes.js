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

exports.getQuiz = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const quizNb = await Quiz.count()
    const totalPages = Math.ceil(quizNb / limit)
    if (limit > quizNb || page > totalPages) {
      res.status(400).send("invalid request in quantity");
    } else {
      const quizzes = await Quiz.find()
        .sort({_id:1})
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.status(200).send({quizzes: quizzes, currentPage: page, totalPages: totalPages, numberQuizzes: quizNb});
      next();
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
