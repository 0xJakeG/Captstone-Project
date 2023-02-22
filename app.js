const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');

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


app.listen(port, ()=> {
    console.log('Server is running on port', port);
});