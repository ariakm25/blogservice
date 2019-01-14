const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');

//Create Post
router.post('/create', verifyToken, function(req, res){
    jwt.verify(req.token, 'top_secret_token_pass', (err, authData) => {
        if (err){
            res.sendStatus(403);
        }else{
            Post.create(req.body)
                .then(post => {
                    res.status(200).json({
                        message: 'success',
                        code: 200,
                        data: post,
                        authData
                    });
                })
                .catch(e => res.status(403).json({
                        message: 'Error',
                        code: 403,
                        data: e
                    }));
        }
    });

});

//Edit Post
router.post('/edit/:id', verifyToken, function(req, res){
    let id = req.params.id;
    jwt.verify(req.token, 'top_secret_token_pass', (err, authData) => {
        if (err){
            res.sendStatus(403);
        }else{
            Post.update(req.body,{
                where: {
                    id
                }
            })
                .then(post => {
                    res.status(200).json({
                        message: 'success',
                        code: 200,
                        data: post,
                        authData
                    });
                })
                .catch(e => res.status(403).json({
                        message: 'Error',
                        code: 403,
                        data: e
                    }));
        }
    });

});

//Delete Post
router.post('/delete/:id', verifyToken, function(req, res){
    let id = req.params.id;
    jwt.verify(req.token, 'top_secret_token_pass', (err, authData) => {
        if (err){
            res.sendStatus(403);
        }else{
            Post.destroy({
                where: {
                    id: id
                }
            })
                .then(post => {
                    res.status(200).json({
                        message: 'success',
                        code: 200,
                        data: post,
                        authData
                    });
                })
                .catch(e => res.status(403).json({
                        message: 'Error',
                        code: 403,
                        data: e
                    }));
        }
    });

});

//All Post
router.get('/show', function(req, res){
    Post.findAll().then(post =>{
        res.status(200).json({
            message: 'success',
            code: 200,
            data: post
        })
    }).catch(e => res.sendStatus(404));
});

//Verify Token
//Format of token
//Authorization: Bearer <access_token>

function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer not undefined
    if (typeof bearerHeader != 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1]; 
        //Set the token
        req.token = bearerToken;
        //Middleware
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;

