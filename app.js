const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const {sequelize} = require('./sequelize/models');
const {recipe, recipe_ingredient} = require("./sequelize/models");
const { Op } = require('sequelize');




//amazon_cognito dependencies. 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const recipeIngredient = require('./sequelize/migrations/recipe-ingredient');
const cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');


app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))
app.use(methodOverride('_method'));
app.use('/sequelize', express.static('sequelize')); 
app.use('/models', express.static('/models'));


//const db = require('/sequelizes')


var port = process.env.PORT || 8080; // set the port

//Connect to database
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});
app.get('/allRecipes', function(req, res) {
    config.connect(function(err) {
        var data = {};
        if(err) console.log(err);
        config.query('SELECT * FROM Testrecipes', function(err, result) {
            if(err) console.log(err);
            data = {print: result};
            res.render('allRecipes', {data: result});
        });
    });
});

app.get('/', (req, res)=> {
    res.render('index');
});

app.use('/', Route);

app.post('/create')
app.listen(port, ()=> {
    console.log('Server is running on port', port);
});

//aws cognito functions
const poolData = {
    UserPoolId: "us-east-1_ODmxRRkbw",
    ClientId: "6stcckuprodns354nqp1r1ig43",
    Storage: new AmazonCognitoIdentity.CookieStorage({domain: 'localhost'})
};

app.post('/create', (req, res) => {
    let user = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log('Creating user with email ', email);
    registerUser({user, email, password}) 
})
//app.post('/addRecipe', (req, res) => {
    //let recipe_name = req.body.recipe_name;
    //let time_to_complete = req.body.time_to_complete;
    //let recipe_description = req.body.recipe_description;
   // add_recipe({recipe_name, time_to_complete, recipe_description})
//})

// POST /recipes - create a new recipe and its ingredients
app.post('/addRecipe', async (req, res) => {
  const { recipe_name, recipe_description, ingredients } = req.body;

  try {
    // create the recipe
    const newRecipe = await recipe.create({
      recipe_name,
      recipe_description
    });

    // create the recipe's ingredients
    const newIngredients = await recipe_ingredient.bulkCreate(
      ingredients.map(({ ingredient_name, measurement_qty, measurement_id }) => ({
        ingredient_id: null, // replace with actual ingredient ID if using a separate table for ingredients
        recipe_id: newRecipe.recipe_id,
        measurement_qty_id: null, // replace with actual measurement qty ID if using a separate table for measurement qtys
        measurement_id
      }))
    );

    res.status(201).json({
      recipe: {
        id: newRecipe.recipe_id,
        recipe_name: newRecipe.recipe_name,
        recipe_description: newRecipe.recipe_description,

        ingredients: newIngredients
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating recipe');
  }
});
exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}