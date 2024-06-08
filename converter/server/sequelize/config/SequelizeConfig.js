const { Sequelize } = require("sequelize");


//для хоста Docker
// host.docker.internal

// без Docker
//localhost

const sequelize = new Sequelize('converter', 'artem', 'artem', {
  host: 'host.docker.internal',
  dialect: 'mssql',
  logging: false
});

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   logging: false
// });






module.exports = {
  sequelize
}



