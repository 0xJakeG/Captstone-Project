const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');


//amazon_cognito dependencies. 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const got = require('got');
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
    UserPoolId: "us-east-1_rAjVncXnw",
    ClientId: "ovs2ojp2n3rt48b7jqcad7kng"
};

const pool_region = 'us-east-1';

const userPool = new AmazonCognitoIdentity.cognitoUserPool(poolData);

function RegisterUser(username, email){
    let attributeList = [];
    attributeList.push
}