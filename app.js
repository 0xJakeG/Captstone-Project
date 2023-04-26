const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
//const { sequelize } = require('./sequelize/models');



//amazon_cognito dependencies. 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
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

config.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Alows the mainController to use the config 
module.exports = { config };
app.use((req, res, next) => {
    req.config = config;
    next();
  });

app.get('/allRecipes', function(req, res) {
    config.query('SELECT * FROM recipes', function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error querying the database');
        }
        res.render('allRecipes', {data: result});
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







app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/addRecipe', (req, res) => {
    const {
      recipe_name,
      recipe_type,
      recipe_description,
      recipe_picture,
      ingredientName,
      ingredientMeasurementQty,
      ingredientMeasurementUnit,
    } = req.body;
  
    const recipeSql =
      'INSERT INTO recipes (recipe_name, recipe_type, recipe_description, recipe_picture) VALUES (?, ?, ?, ?)';
    const ingredientSql =
      'INSERT INTO recipe_ingredients (recipe_id, ingredient_name, measurement_qty, measurement_unit) VALUES (?, ?, ?, ?)';
  
    config.query(
      recipeSql,
      [recipe_name, recipe_type, recipe_description, recipe_picture],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
  
        console.log(results);
        const recipeId = results.insertId;
  
        for (let i = 0; i < ingredientName.length; i++) {
          config.query(ingredientSql,[recipeId,ingredientName[i],
                                      ingredientMeasurementQty[i],
                                      ingredientMeasurementUnit[i]
                                     ],
            (error, results, fields) => {
              if (error) {
                console.error(error);
                res.sendStatus(500);
                return;
              }
              console.log(results);
            }
          );
        }
  
        res.sendStatus(200);
      }
    );
  });
app.post('/create', (req, res) => {
    let user = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log('Creating user with email ', email);
    registerUser({user, email, password}) 
})
