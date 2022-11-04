const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const answerCtrl = require('../controllers/answers');

router.post('/', auth, answerCtrl.postAnswer);

module.exports = router;
