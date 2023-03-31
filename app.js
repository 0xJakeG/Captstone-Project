const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const db = require('./sequelize/models');
const { request } = require('express');
const bodyParser = require('body-parser');
const userModel = require('./sequelize/models/user');

const {user} = require ("./sequelize/models");
require('dotenv').config();

const {recipe} = require("./sequelize/models");
require('dotenv').config()

app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))
app.use(methodOverride('_method'));

var port = process.env.PORT || 8080; // set the port

//Connect to database
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});
app.get('/', function(req, res) {
    config.connect(function(err) {
        var data = {};
        if(err) console.log(err);
        config.query('SELECT * FROM Testrecipes', function(err, result) {
            if(err) console.log(err);
            data = {print: result};
            res.render('index', {data: result});
        });
    });
});

app.get('/', (req, res)=> {
    res.render('index');
});

app.use('/', Route);

app.post('/create', (req, res) => {
    user.create({firstName: req.body.name, email: req.body.email, password: req.body.password}) //.then(user => res.json(user))
})

db.sequelize.sync().then((req)=> {
    app.listen(port, ()=> {
        console.log('Server is running on port', port);
    });
});