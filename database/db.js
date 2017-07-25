'use strict'

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/auth";

const createDatabase = function(){

    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        url = url;
        console.log("Database Created!");
        db.close();
    })
}

const createCollection = function(collectionName){

    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        db.createCollection(collectionName, function(err, res){
            if(err) throw err;
            console.log('Collection Created!');
            db.close();
        })
    });
}


const insertIntoCollection = function(data, callback){

    MongoClient.connect(url, function(err, db){
        db.collection("user").insertOne(data, callback);
        db.close();
    });
}

const getUserByUsername = function(data, callback){

    MongoClient.connect(url, function(err, db){
        db.collection("user").findOne({username: username}, callback);
        db.close();
    });
}

module.exports.createDatabase = createDatabase;
module.exports.createCollection = createCollection;
