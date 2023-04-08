const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');


//amazon_cognito dependencies. 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');


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

app.post('/create')
app.listen(port, ()=> {
    console.log('Server is running on port', port);
});

//aws cognito functions
const poolData = {
    UserPoolId: "us-east-1_ODmxRRkbw",
    ClientId: "6stcckuprodns354nqp1r1ig43"
};
AWS.config.update({
    region: 'us-east-1'
})
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