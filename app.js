
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const methodOverride = require('method-override');
const Route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
//const { sequelize } = require('./sequelize/models');



//amazon_cognito dependencies. 
//const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
//const cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
//global.fetch = require('node-fetch');



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

app.use('/api/'), require('./routes/')
//const db = require('/sequelizes')


var port = process.env.PORT || 3001; // set the port

//Connect to database
var config = mysql.createConnection({
    user: 'JakeAdmin',
    password: '69LgU84Bta8RZJr',
    host: 
    'awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com',
    database: 'booksforcooks'
});
app.get('/allRecipes', function(req, res) {
    config.connect(function(err) {
        var data = {};
        if(err) console.log(err);
        console.log("database connected successfully");
        config.query('SELECT * FROM recipes', function(err, result) {
            if(err) console.log(err);
            data = {print: result};
            console.log(data);
            res.render('allRecipes', {data: result});
        });
        

        
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

//amazon_cognito dependencies. 
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { pool } = require('mssql');
const cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');
const AWS = require('aws-sdk/global');

//aws cognito functions
const poolData = {
    UserPoolId: "us-east-1_ODmxRRkbw",
    ClientId: "4mq5ne89f13lfp2d5pv8cvvc8p",
    Storage: new AmazonCognitoIdentity.CookieStorage({domain: 'localhost'})
};
app.post('/create', (req, res) => {
    let user = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log('Creating user with email ', email);
    registerUser({user, email, password}) 
})
let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let userData = {
    email: 'email',
    Pool: userPool,
    Storage: new AmazonCognitoIdentity.CookieStorage({domain: "localhost"})
};
/*let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationDetails);
let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
	onSuccess: function(result) {
		var accessToken = result.getAccessToken().getJwtToken();

		//POTENTIAL: Region needs to be set if not already set previously elsewhere.
		AWS.config.region = 'us-east-1';

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: '...', // your identity pool id here
			Logins: {
				// Change the key below according to the specific region your user pool is in.
				'cognito-idp.us-east-1.amazonaws.com/us-east-1_ODmxRRkbw': result
					.getIdToken()
					.getJwtToken(),
			},
		});

		//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
		AWS.config.credentials.refresh(error => {
			if (error) {
				console.error(error);
			} else {
				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				console.log('Successfully logged!');
			}
		});
	},

	onFailure: function(err) {
		alert(err.message || JSON.stringify(err));
	},
});*/


exports.handler = async function(event, context, callback) {
    const json = JSON.parse(event.body)
    const result = await registerUser(json)

    callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result)
    })
}