

module.exports =
{
  development: {
    username: "JakeAdmin",
    password: "69LgU84Bta8RZJr",
    database: "booksforcooks",
    host: "awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 10, // maximum number of connections
      min: 0, // minimum number of connections
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing an error
      idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    },
  },
  test: {
    username: "JakeAdmin",
    password: "69LgU84Bta8RZJr",
    database: "booksforcooks",
    host: "awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  production: {
    username: "JakeAdmin",
    password: "69LgU84Bta8RZJr",
    database: "booksforcooks",
    host: "awseb-e-epz4ed3tmg-stack-awsebrdsdatabase-uz3xxyihfosx.cs6g7v4x3uz2.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  }
}