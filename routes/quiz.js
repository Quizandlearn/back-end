const express = require('express');
const router = express.Router();

const quizCtrl = require('../controllers/quizzes');

router.post('/', quizCtrl.postQuiz);
router.get('/', quizCtrl.getQuiz);

module.exports = router;