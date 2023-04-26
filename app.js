const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const mysql = require("mysql2/promise");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const saltRounds = 10;
//const { sequelize } = require('./sequelize/models');
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

app.use(express.json());


//const db = require('/sequelizes')


var port = process.env.PORT || 8080; // set the port

//Connect to database
let sql_connection = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks',
});

app.get('/allRecipes', function(req, res) {
    sql_connection.query('SELECT * FROM recipes', function(err, result) {
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

app.post("/register", (req,res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, hash).then((hash) => {
        sql_connection.execute(
            'INSERT INTO users (`username`, `email`, `password`) VALUES(?,?,?)',
            [username, email, hash],
            function(err,results,fields){
                console.log(results);
                console.log(fields);
                console.log(err);
            }
        )
        
    })
    res.json("register");
});

app.post("/signin", (req,res) => {
    res.json("login");
});

app.get("/profile", (req,res) => {
    res.json("profile");
});