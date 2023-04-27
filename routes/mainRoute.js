const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

router.get('/', controller.index);

router.get('/home', controller.index);

router.get('/signin', controller.signin);

router.get('/register', controller.register);

router.get('/allRecipes', controller.allRecipes);

router.get('/allRecipes/:id', controller.recipeDetails);

router.get('/recipes/:recipe_id', controller.recipeDetails);

router.get('/about', controller.about);

router.get('/head', controller.head);

router.get('/header', controller.header);

router.get('/footer', controller.footer);

//Logged In

router.get('/homeS', controller.homeS);

router.get('/add_recipe', controller.add_recipe);

router.get('/recipeMeta', controller.recipeMeta);

router.get('/allRecipesS', controller.allRecipesS);

//router.get('/allRecipesS/:id', controller.recipeDetailsS);

//router.get('/recipesS/:recipe_id', controller.recipeDetailsS);

router.get('/map', controller.map);

router.get('/aboutS', controller.aboutS);

router.get('/headS', controller.headS);

router.get('/headerS', controller.headerS);

router.get('/footerS', controller.footerS);

module.exports = router;