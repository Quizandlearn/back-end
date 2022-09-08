const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const quizCtrl = require('../controllers/quizzes');

router.post('/', auth, quizCtrl.postQuiz);
router.get('/', auth, quizCtrl.getQuizzes);
router.get('/:id', auth, quizCtrl.getQuizById);

module.exports = router;
