var express = require('express');
var router = express.Router();
var UserController = require('./userController');

router.get('/', function(req, res) {
    res.send({main:"main route"});
});

router.get('/users', function(req, res) {
    UserController.getUsers(req, res);
});

router.post('/users', function(req, res) {
    UserController.saveUser(req,res);
});

module.exports = router;
