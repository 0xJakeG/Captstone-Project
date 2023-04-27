const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
let hashSalt = 10;
let emailRegex = new RegExp("^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$");
app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(morgan('tiny'))
app.use(methodOverride('_method'));
app.use('/sequelize', express.static('sequelize')); 
app.use('/models', express.static('/models'));
app.use(bodyParser.json());
app.use(express.json());

var port = process.env.PORT || 8080; // set the port

//Connect to database
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});

// Alows the mainController to use the config 
//module.exports = { config };
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

//Function to register a new user 
app.post("/register", async (req,res) => {
    const { name, email, password } = req.body;
    let username = name.toLowerCase();
    let lEmail = email.toLowerCase();
    let emailTest = lEmail.match(emailRegex);
    if (!emailTest)
    {
        res.send("Invalid Email");
    }
    else
    {
        const newUser = 'INSERT INTO users (`username`, `email`, `password`) VALUES(?,?,?)'
        bcrypt.hash(password, hashSalt).then((hash) => {
            (
                config.query(newUser,
                [username, lEmail, hash],
                function(err,results){
                    console.log(results);
                    if(err != NULL)
                    {
                        console.log(err);
                    }
                    
                }
            ))
        });
        res.send("Thank you for signing up " + username);
    }
});

//testing fucntion
app.post("/return_value", (req,res) => {
    const { name, email, password } = req.body;
    let username = name.toLowerCase();
        res.send("register");
    
   
});
app.post("/sign_in", (req,res) => {
    const {email_or_username, userPassword} = req.body;
    const userAuthName = "SELECT password FROM users WHERE username = ?;";
    const userAuthEmail = "SELECT password FROM users WHERE email = ?;";
    let lower_e_or_u = email_or_username.toLowerCase();
    let comp = lower_e_or_u.match(emailRegex);
    let retreived_pass = "";
    if(comp)
    {
        retreived_pass = config.query(userAuthEmail, [lower_e_or_u], function(err, results){
            if(err)
            {
                console.log(err);
            }
            console.log(results);
        });
    }

    res.json("login");
});

app.get("/profile", (req,res) => {
    res.json("profile");
});

exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}