const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getUser);
router.put('/user/:id', auth, userCtrl.modifyUser);
router.put('/user/:id/createdQuizzes', auth, userCtrl.modifyUserCreatedQuizzes);
router.put(
  '/user/:id/answeredQuizzes',
  auth,
  userCtrl.modifyUserAnsweredQuizzes,
);
router.put(
  '/user/:id/favoriteQuizzes',
  auth,
  userCtrl.modifyUserFavoriteQuizzes,
);
router.put('/user/:id/password', auth, userCtrl.modifyPassword);

module.exports = router;
