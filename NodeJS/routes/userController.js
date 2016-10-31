var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/user";

userController = {
    getUsers: (err, callback) => {
        var theDb;
        MongoClient.connectAsync(connection)
            .then(function(db) {
                theDb = db;
                return theDb.collection("test").findAsync({});
            })
            .then(function (cursor) {
                cursor.toArray((err, items) => {
                    callback(items);
                });
            })
            .finally(() => {theDb.close()})
            .catch((err)=>{
                console.log(err);
                err(500);
            });
    },

    getUser: (user) => {
        return new Promise(function(resolve,reject) {
            var theDb;
            return MongoClient.connectAsync(connection)
                .then(function(db) {
                    console.log('conn');
                    theDb = db;
                    return theDb.collection("test").findAsync({"user":user});
                })
                .then(function (cursor) {
                    cursor.toArray((err, items) => {
                        console.log('array');
                        resolve(items);
                    });
                })
                .finally(() => {
                    console.log('closing');
                    theDb.close()
                })
                .catch(reject);
        });
    },
    //getUser: (user, err, callback) => {
    //    var theDb;
    //    MongoClient.connectAsync(connection)
    //        .then(function(db) {
    //            theDb = db;
    //            return theDb.collection("test").findAsync({"user":user});
    //        })
    //        .then(function (cursor) {
    //            cursor.toArray((err, items) => {
    //                callback(items);
    //            });
    //        })
    //        .finally(() => {theDb.close()})
    //        .catch((err)=>{
    //            console.log(err);
    //            err(500);
    //        });
    //},

    saveUser: (user, err, callback) => {
        var theDb;
        MongoClient.connectAsync(connection)
            .then( function(db) {
                theDb = db;
                return theDb.collection("test").insertAsync(user);
            })
            .then(() => {
                callback();
            })
            .finally(() => {
                theDb.close()
            })
            .catch((e)=>{
                console.log(e);
                err(e);
            });
    }

};

module.exports = userController;
