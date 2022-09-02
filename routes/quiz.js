const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const quizCtrl = require('../controllers/quizzes');
const questionCtrl = require('../controllers/questions');
const choiceCtrl = require('../controllers/choices');

router.post('/', auth, quizCtrl.postQuiz);
router.post('/:id/questions', auth, questionCtrl.postQuestions);
router.post('/:id/questions/:id/choices', auth, choiceCtrl.postChoices);
router.get('/', auth, quizCtrl.getQuiz);

module.exports = router;
