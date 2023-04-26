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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set the port

//Connect to database
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});
const pool = mysql.createPool({
    host: 'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    database: 'booksforcooks'
  });

app.get('/allRecipes', function(req, res) {
    config.connect(function(err) {
        var data = {};
        if(err) console.log(err);
        config.query('SELECT * FROM recipes', function(err, result) {
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


app.post('/addRecipe', (req, res) => {
    const { recipe_name, recipe_type, 
            recipe_description, recipe_picture, 
            ingredientName, ingredientMeasurementQty, 
            ingredientMeasurement } = req.body;  
    const sql = 'INSERT INTO recipes (recipe_name, recipe_type, recipe_description, recipe_picture) VALUES (?, ?, ?, ?)';
  
    config.query(sql, [recipe_name, recipe_type, recipe_description, recipe_picture], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
  
      console.log(results);
      res.sendStatus(200);
    });

    for (let i = 0; i < ingredientName.length; i++) {
        const ingredientSql = 'INSERT INTO ingredients (ingredient_name) VALUES (?)';
        config.query(ingredientSql, [ingredientName[i]], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
          }
          console.log(results);
        });
      }

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

exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}