const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getUser);
router.put('/user/:id', auth, userCtrl.modifyUser);

module.exports = router;
