const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();


router.get('/', controller.index);

router.get('/signin', controller.signin);

router.get('/register', controller.register);

router.get('/recipes', controller.recipes);

router.get('/recipeMeta', controller.recipeMeta);

router.get('/about', controller.about);

module.exports = router;