
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  // Konfigurasi koneksi database
  dialect: 'mysql',
  host: 'localhost',
  port: 8081,
  user: 'root',
  password: '',
  database: 'singup',
});

module.exports = sequelize;
