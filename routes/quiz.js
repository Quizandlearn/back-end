const express = require('express');
const router = express.Router();

const quizCtrl = require('../controllers/quizzes');

router.post('/', quizCtrl.postQuiz);

module.exports = router;