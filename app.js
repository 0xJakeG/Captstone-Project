const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "JakeAdmin",
    password: "69LgU84Bta8RZJr",
    database: "ebdb",

})

db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Database connected");

});

app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))

var port = process.env.PORT || 8080; // set the port

app.get('/', (req, res)=> {
    res.render('index.ejs');
});

app.get('/signin', (req, res)=> {
    res.render('signin.ejs');
});

app.get('/register', (req, res)=> {
    res.render('register.ejs');
});


app.listen(port)