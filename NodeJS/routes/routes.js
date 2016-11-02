var express = require('express');
var router = express.Router();
var UserController = require('./userController');

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session && req.session.loggedIn === true)
        return next();
    else
        return res.sendStatus(401);
};

router.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
        res.sendStatus(400);
    } else {
        UserController.getUser(req.query.username)
            .then((users) => {
                if (users.length > 0) {
                    if(users[0].user === req.query.username && req.query.password === users[0].password) {
                        req.session.loggedIn = true;
                        req.session.username = req.query.username;
                        res.sendStatus(200);
                    }
                } else {
                    res.send(401);
                }
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    }
});

router.get('/profile', auth, function (req, res) {
    UserController.getUser(req.session.username)
        .then((users) => {
            if (users.length > 0) {
                var obj = {name:users[0].name};
                res.send(obj);
            } else {
                res.send(401);
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


router.get('/signup', function (req, res) {
    if (!req.query.username || !req.query.password || !req.query.name) {
        res.sendStatus(400);
    } else {
        UserController.getUser(req.query.username)
            .then(function(users){
                if (users.length > 0) {
                    res.sendStatus(403);
                } else {
                    var newUser = {
                        user: req.query.username,
                        password: req.query.password,
                        name: req.query.name
                    };
                    UserController.saveUser(newUser)
                        .then(function() {
                                res.sendStatus(200);
                            })
                        .catch(function() {
                                res.sendStatus(500);
                            });
                }
            })
            .catch(function(err){
                console.log(err);
                res.sendStatus(500);
            });
    }
});

router.get('/users', auth, function(req, res) {
    UserController.getUsers(
        (code)=>{
            res.sendStatus(status);
        },
        (users)=>{
            res.send(users);
        });
});

module.exports = router;
