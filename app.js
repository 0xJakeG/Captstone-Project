const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const db = require('./sequelize/models');
const { request } = require('express');
const bodyParser = require('body-parser');
const userModel = require('./sequelize/models/user');

const {user} = require ("./sequelize/models");
require('dotenv').config({ path: './.env'});

app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))
app.use(methodOverride('_method'));

var port = process.env.PORT || 8080; // set the port

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