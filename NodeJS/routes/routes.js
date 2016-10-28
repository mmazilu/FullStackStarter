var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connections = {
    users: "mongodb://192.168.99.100:27017/customer"
};


router.get('/', function(req, res, next) {
    res.send({main:"main route"});
});

router.get('/users', function(req, res, next) {

    var theDb;
    MongoClient.connectAsync(connections.users)
        .then( function(db) {
            theDb = db;
            return theDb.collection("test").findAsync({});
        })
        .then(function (cursor) {
            cursor.toArray((err, items) => {
                res.send(items);
            });
        })
        .finally(() => {theDb.close()})
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/users', function(req, res) {

    var theDb;
    MongoClient.connectAsync(connections.users)
        .then( function(db) {
            theDb = db;
            return theDb.collection("test").insertAsync({user:"666"});
        })
        .then(() => {
            res.sendStatus(200);
        })
        .finally(() => {
            theDb.close()
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
