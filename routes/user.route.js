const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//Register
router.post('/register', function(req, res){
    User.create(req.body)
        .then(user => {
            res.status(200).json({
                message: 'Sucess',
                data: user
            });
        })
        .catch(e => res.status(403).json({
                message: 'Error',
                data: e
            }));
});

//Login
router.post('/login', function(req, res){
    let user = req.body.username;
    let pass = req.body.password;
    User.findOne({
        where: {
            username: user
        }
    })
    .then(result => {
        if(result){
            bcrypt.compare(pass, result.password, (err, isMatch) => {
                if(isMatch){
                    var token = jwt.sign({
                        username: user
                    },'top_secret_token_pass', { expiresIn: '1h' });
                    return res.status(200).json({
                        message: 'success',
                        code: 200,
                        token
                    })
                }else{
                    res.status(401).json({
                        message: 'Wrong Password!',
                        code:401
                    })
                }
            });
        }else{
            res.status(404).json({
                message: 'Authentication Failed!',
                code:404
            });
        }
    })
    .catch(e => res.status(500).json({
        message: 'Error',
        code:500,
        data: e
    }));
});
module.exports = router;

