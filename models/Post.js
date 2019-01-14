const Sequelize = require('sequelize');
const db = require('../config/db');

const Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: Sequelize.STRING
});

module.exports = Post;