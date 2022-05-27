const Question = require("../models/question");
const Quiz = require("../models/quiz");

exports.postQuestions = async (req, res, next) => {
        req.body.questions.map( async question => {
            try {
                const createQuestion = await new Question({...question});
                await createQuestion.save();
                await Quiz.updateOne( {_id: question.id_quiz},{ $push: { questions : createQuestion._id  }})
            } catch(error) {
                res.status(400).send(error.message);
                throw error
            }
            res.status(200).send({ message: "Question(s) créée(s) en bdd et reliée(s) au quiz" });
        })
};