const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const mysql_store = require("express-mysql-session")(session);
const options = {
    connectionLimit: 10,
    password: '69LgU84Bta8RZJr',
    user: 'JakeAdmin',
    database: 'booksforcooks',
    host: 'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    port: '3306',
    createDatabaseTable: true
}
const sessionStore = new mysql_store(options);
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
app.use(cookieParser());
app.use(session({
    name: 'booksforcooks_session',
    secret: 'insecure_secret' ,
    resave:false ,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000, sameSite: true, httpOnly: true},
    store: sessionStore,

}));
    
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
    let user_info = {};
    if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info;
    } 
    config.query('SELECT * FROM recipes', function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error querying the database');
        }
        res.render('allRecipes', {data: result, user_info});
    });
});

app.get('/recipeMeta', function(req, res) {
    let user_info = {};
    if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info;
    } 
    config.query('SELECT * FROM recipes', function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error querying the database');
        }
        res.render('recipeMeta', {data: result, user_info});
    });
});


app.get('/', (req, res)=> {
    let user_info = {};

    if(req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info; 
       
        //req.session.user_info.user_id = "jerry"; // get the user id from session
        console.log(req.session.user_info);
    }
    console.log(user_info);
    res.render('index', { user_info }); // pass the user id to the template
});

app.get('/add_recipe', (req,res) => {
    let user_info = {};
    if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info;
        res.render('add_recipe', {user_info});
    } 
    else {
        res.redirect("signin", {user_info})
    }
    
});



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
      instructionDescription
    } = req.body;
  
    
    const recipeSql =
      'INSERT INTO recipes (user_id, recipe_name, recipe_type, recipe_description, recipe_picture) VALUES (?, ?, ?, ?, ?)';
    const ingredientSql =
      'INSERT INTO recipe_ingredients (recipe_id, ingredient_name, measurement_qty, measurement_unit) VALUES (?, ?, ?, ?)';
    
    const instructionSql =
        'INSERT INTO instructions (recipe_id, instruction_description, order_number) VALUES (?, ?, ?)';
  
    config.query(
      recipeSql,
      [req.session.user_info.user_id, recipe_name, recipe_type, recipe_description, recipe_picture],
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

        for (let j = 0; j < instructionDescription.length; j++) {
            config.query(instructionSql,[recipeId, instructionDescription[j], j + 1],
              (error, results, fields) => {
                if (error) {
                  console.error('Error inserting instruction:', error);
                  res.sendStatus(500);
                  return;
                }
                console.log(results);
              }
            );
          }
  
        res.redirect("recipeMeta");
      }
    );
  });


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
            config.query(newUser, [username, lEmail, hash], // Use 'hash' here
                function(err,results){
                    console.log(results);
                    if(err)
                    {
                        console.log(err);
                    }
                }
            );
        });
        res.redirect("signin");
    }
});
app.get("/logout", (req, res) => 
{
    req.session.user_info.email = "email";
    req.session.user_info.user_id = "812";
    req.session.user_info.test = false;
    req.session.user_info.authenticated = false;
    res.redirect("/");
    
});
//function for user to sign in
app.post("/sign_in", (req,res) => {
    let retreived_pass = "";
    const userAuthEmail = "SELECT * FROM users WHERE email = ?;";
    const userAuthName = "SELECT * FROM users WHERE username = ?;";
    const { email_or_username, password } = req.body;
    console.log(req.body);
    let lower_e_or_u = email_or_username.toLowerCase();
    let comp = lower_e_or_u.match(emailRegex);
    
    //if they used an email, Authenticate through here. 
    if(comp)
    {
        config.query(userAuthEmail, [lower_e_or_u], function(err, results){
            if(err)
            {
                console.log(err);
            }
            retreived_pass = results[0].password;
            bcrypt.compare(password, retreived_pass).then((matches) => {
                if(!matches)
                {
                    res.status(403).send("failed to authenticate");
                }
                else
                {
                    let user_id = results[0].user_id;
                    let username = results[0].username;
                    let email = results[0].email;
                    req.session.user_info = {
                        user_id: user_id,
                        authenticated: false,
                        username: username,
                        email: email
                    };
                    console.log(req.session.user_info);
                    //console.log(req.session.user_info.authenticated);
                    res.redirect("/");
                }
            });
        }); 
    }
    else
    {
        config.query(userAuthName, [lower_e_or_u], function (err, results) {
            if (err) {
                console.log(err);
            }
            retreived_pass = results[0].password;
            bcrypt.compare(password, retreived_pass).then((matches) => {
                if (!matches) {
                    res.status(403).send("failed to authenticate");
                }
                else {
                    let user_id = results[0].user_id;
                    let username = results[0].username;
                    let email = results[0].email;
                    req.session.user_info = {
                        user_id: user_id,
                        authenticated: true,
                        test: false,
                        username: username,
                        email: email
                    };
                    console.log(req.session.user_info);
                    //console.log(req.session.user_info.authenticated);
                    res.redirect("/");
                }
            }); 
        }); 
    }    
});
app.get("/session", (req, res) =>
{

});

exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}

app.use('/', Route);