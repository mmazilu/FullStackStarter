var bluebird = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var MongoCollection  = require('mongodb').Collection;

bluebird.promisifyAll(MongoCollection.prototype);
bluebird.promisifyAll(MongoClient);

const connection ="mongodb://" + process.env.DB_CONNECTION + "/test";

userController = {
    getMessages: (err, callback) => {
        var theDb;
        MongoClient.connectAsync(connection)
            .then(function(db) {
                theDb = db;
                return theDb.collection("messages").findAsync({});
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

    saveMessage: (message) => {
        return new Promise(function(resolve,reject) {
            var theDb;
            return MongoClient.connectAsync(connection)
                .then( function(db) {
                    theDb = db;
                    return theDb.collection("messages").insertAsync(message);
                })
                .then(resolve)
                .finally(() => {
                    theDb.close()
                })
                .catch(reject);
        });
    }

};

module.exports = userController;
