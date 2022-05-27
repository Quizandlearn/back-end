const express = require('express');

const router = express.Router();

const quizCtrl = require('../controllers/quizzes');
const questionCtrl = require('../controllers/questions');

router.post('/', quizCtrl.postQuiz);
router.post('/:id/questions', questionCtrl.postQuestions);
router.get('/', quizCtrl.getQuiz);

module.exports = router;
