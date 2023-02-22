const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/images', express.static('/images'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'))

var port = process.env.PORT || 8080; // set the port

app.get('/', (req, res)=> {
    res.render('index');
});

app.get('/signin', (req, res)=> {
    res.render('signin');
});

app.get('/register', (req, res)=> {
    res.render('register');
});

app.get('/recipes', (req, res)=> {
    res.render('recipes.ejs');
});

app.get('/recipeMeta', (req, res)=> {
    res.render('recipeMeta.ejs');
});


app.listen(port, ()=> {
    console.log('Server is running on port', port);
});