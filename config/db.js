const Sequelize = require('sequelize');
const db = new Sequelize('blogservice', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;