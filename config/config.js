require('dotenv').config();

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({region: 'us-east-1'});

async function getEnvVars() {
  const params = {
    FunctionName: 'env',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({}),
  };

  const response = await lambda.invoke(params).promise();
  const envVars = JSON.parse(response.Payload);

  return envVars;
}

module.exports = async () => {
  const envVars = await getEnvVars();

  return {
    "development": {
      "username": envVars.DB_USERNAME,
      "password": envVars.DB_PASSWORD,
      "database": envVars.DB_DATABASE,
      "host": envVars.DB_HOST,
      "dialect": envVars.DB_DIALECT
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  };
};
