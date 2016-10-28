var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/user";

userController = {
    getUsers: (req, res) => {
        var theDb;
        console.log(connection);
        MongoClient.connectAsync(connection)
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
    },

    saveUser: (req, res) => {
        var theDb;
        MongoClient.connectAsync(connection)
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
    }

};

module.exports = userController;
