require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "dsc",
    host: "34.75.165.102",
    dialect: "mysql",
    operatorsAliases : 'false',
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    databas : "database_production",
    host: "34.75.165.102",
    dialect:  "mysql",
    operatorsAliases : 'false',
    logging: false,
  }
}
