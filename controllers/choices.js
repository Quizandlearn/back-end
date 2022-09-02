const Question = require('../models/question');
const Choice = require('../models/choice');

exports.postChoices = async (req, res) => {
  const idChoicesArray = [];
  try {
    req.body.choices.map(async (choice, i) => {
      const createChoice = await new Choice({ ...choice });
      await createChoice.save();
      await Question.updateOne(
        { _id: choice.id_question },
        { $push: { choices: createChoice._id } },
      );
      idChoicesArray.push(createChoice._id);
      if (req.body.choices.length === i + 1) {
        res.status(200).send({
          message: 'Choice(s) créé(s) en bdd et relié(s) à la question',
          idQuestion: choice.id_question,
          idChoicesArray,
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
    throw error;
  }
};
