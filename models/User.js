const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Username already taken!'
        },
        allowNull: false
    },
    password: Sequelize.STRING
}, {
    hooks: {
        beforeValidate: hashPw
    }
});

function hashPw(user) {
    if (user.changed('password')){
        return bcrypt.hash(user.password, 10)
            .then(pass => {
                user.password = pass;
            })
    }
}

module.exports = User;