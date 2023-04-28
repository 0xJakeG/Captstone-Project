//Dependencies
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

//options variable for to be passed into mysql_store. Connects to database and creates new table for sessinos
//enviroment variables proved to much a time sink for this project, so they remain here in plain text
const options = {
    connectionLimit: 10,
    password: '69LgU84Bta8RZJr',
    user: 'JakeAdmin',
    database: 'booksforcooks',
    host: 'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    port: '3306',
    createDatabaseTable: true
}
//initializes session storage
const sessionStore = new mysql_store(options);
//salt for bcrypt
let hashSalt = 10;
//regex that ensures email submitted is in correct format. does not ensure email is legitamite or owned by submitter
let emailRegex = new RegExp("^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$");

//express is middleware handling requests to and from browser
app = express();

//allows the app to use ejs files
app.set('view engine', 'ejs');

//every request will use these 
//static allows javascript files and images to be used
app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.static(__dirname + '/views'));
//body parser is middleware for accessing body elements from a form submission
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

//initializing the session to maintain the user state. Stored on our database. Local cookie only has cookie ID
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
//enviroment variables proved to much a time sink for this project, so they remain here in plain text
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});

// Alows the mainController to use the config 
module.exports = { config };
app.use((req, res, next) => {
    req.config = config;
    next();
  });

//allRecipes get request. passes user_info and data from sql query to ejs file
//checks if user is authenticated, but does not re-route them if this is called.
//supposed to be authenticated only access
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

//recipemeta page. Pulls the information from the session to query database for recipes associated with user_id
//checks if user is authenticated, but does not re-route them if this is called.
//supposed to be authenticated only access
app.get('/recipeMeta', function(req, res) {
    let user_info = {};
    //if user is authenticated, send that information to template ejs file
    if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info;
    } 
    config.query('SELECT * FROM recipes WHERE user_id = ?',[user_info.user_id], function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error querying the database');
        }
        res.render('recipeMeta', {data: result, user_info}); //pass result of query and user_info to ejs file 
    });
});

//allows index to be loaded without directly calling index. / is enough 

app.get('/', (req, res)=> {
    let user_info = {};
    //if user is authenticated, send that information to template ejs file
    if(req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info; 
    }
    res.render('index', { user_info }); // pass the user id to the template
});

//add_recipe is for authenticated users only, non authenticated users are redirected to signin 
app.get('/add_recipe', (req,res) => {
    let user_info = {};
    //if user is authenticated, send that information to template ejs file
    if (req.session && (req.session.user_info != null) && (req.session.user_info.authenticated)) {
        user_info = req.session.user_info;
        res.render('add_recipe', {user_info});
    } 
    //else they go to signin 
    else {
        res.redirect("signin", {user_info})
    }
    
});


//when server starts, this is called as a success log
app.post('/create')
app.listen(port, ()=> {
    console.log('Server is running on port', port);
});


//when a user submits the form on addRecipes, a post request is passed. This is how the tables are populated
app.post('/addRecipe', (req, res) => {
    //req.body is stored in this object for future use
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
  
    //prepared sql statement for the recipe. 
    const recipeSql =
      'INSERT INTO recipes (user_id, recipe_name, recipe_type, recipe_description, recipe_picture) VALUES (?, ?, ?, ?, ?)';
    //prepared sql statement for the ingredients
    const ingredientSql =
      'INSERT INTO recipe_ingredients (recipe_id, ingredient_name, measurement_qty, measurement_unit) VALUES (?, ?, ?, ?)';
    //prepared sql statement for the instructions
    const instructionSql =
        'INSERT INTO instructions (recipe_id, instruction_description, order_number) VALUES (?, ?, ?)';
    
    //query to insert into recipes table
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
        //ingredients and instructions tables have a foreign key to connect to recipe
        const recipeId = results.insertId;
        
        //may be multiple ingredients per recipe. for loop performs sql query to insert each one based on input
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

        //may be multiple ingredients per recipe. for loop performs sql query to insert each one based on input
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
        //after a recipe is entered, user is redirected to recipeMeta to view the recipes they have
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
    //if email is invalid format, block the transaction. 
    if (!emailTest)
    {
        res.send("Invalid Email");
    }
    //if email is valid, insert into users table
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
        //after registration, user is redirected to sign in and become authenticated
        res.redirect("signin");
    }
});

//logout request 
app.get("/logout", (req, res) => 
{
    //when logout is called, authentication status is changed to false, and user is redirected to index
    req.session.user_info.authenticated = false;
    res.redirect("/");
    
});

//function for user to sign in.
//users signed up with both email and username. as such, they can use either to sign in with valid password. 
app.post("/sign_in", (req,res) => {
    //variable to store password hash retrieved from database
    let retreived_pass = "";
    //prepared sql statements
    const userAuthEmail = "SELECT * FROM users WHERE email = ?;";
    const userAuthName = "SELECT * FROM users WHERE username = ?;";
    const { email_or_username, password } = req.body;
    let lower_e_or_u = email_or_username.toLowerCase();
    let comp = lower_e_or_u.match(emailRegex);
    
    //if they used an email, Authenticate through here. 
    if(comp)
    {
        config.query(userAuthEmail, [lower_e_or_u], function (err, results) {
            if (err) {
                console.log(err);
            }
            retreived_pass = results[0].password;
            //bycrpt compares inputted password to hashed stored password 
            bcrypt.compare(password, retreived_pass).then((matches) => {
                //on failure 
                if (!matches) {
                    res.status(403).send("failed to authenticate");
                }
                //on success
                else {
                    let user_id = results[0].user_id;
                    let username = results[0].username;
                    let email = results[0].email;
                    req.session.user_info = {
                        user_id: user_id,
                        authenticated: true,
                        username: username,
                        email: email
                    };
                    //after authentication, redirect to home page
                    res.redirect("/");
                }
            }); 
        }); 
    }
    //if they used username, Authenticate through here. 
    else
    {
        config.query(userAuthName, [lower_e_or_u], function (err, results) {
            if (err) {
                console.log(err);
            }
            retreived_pass = results[0].password;
            //bycrpt compares inputted password to hashed stored password
            bcrypt.compare(password, retreived_pass).then((matches) => {
                //on failure 
                if (!matches) {
                    res.status(403).send("failed to authenticate");
                }
                //on success
                else {
                    let user_id = results[0].user_id;
                    let username = results[0].username;
                    let email = results[0].email;
                    req.session.user_info = {
                        user_id: user_id,
                        authenticated: true,
                        username: username,
                        email: email
                    };
                    //after authentication, redirect to home page
                    res.redirect("/");
                }
            }); 
        }); 
    }    
});

//potentially insecure end-point. this call is used by display_my_recipe.js, but a manual request could potentially reveal information 
app.get("/session", (req, res) =>
{
    console.log(req.session.user_info.user_id);
    mySession = {
        user_id : req.session.user_info.user_id
    };
    mySessionJSON = JSON.stringify(mySession);
    res.send(mySessionJSON);
});

exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}

//app.js takes precedent over the controller. if a get request is not handled here, look to mainRoute.js which connects to mainController.js 
app.use('/', Route);