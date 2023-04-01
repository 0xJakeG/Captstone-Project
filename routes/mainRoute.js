const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();


router.get('/', controller.index);

router.get('/signin', controller.signin);

router.get('/register', controller.register);

router.get('/recipes', controller.recipes);

router.get('/recipeMeta', controller.recipeMeta);

router.get('/allRecipes', controller.allRecipes);

router.get('/allRecipes:id', controller.showRecipe);

router.get('/about', controller.about);

router.get('/head', controller.head);

router.get('/header', controller.header);

router.get('/footer', controller.footer);

module.exports = router;