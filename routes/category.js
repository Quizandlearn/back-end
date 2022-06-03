const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const categoryCtrl = require('../controllers/categories');

router.get('/', auth, categoryCtrl.getCategories);

module.exports = router;
