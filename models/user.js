'use strict'

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
var validate = require('mongoose-validator');



const saltRounds = 10;

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [6, 10],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Username should contain alpha-numeric characters only.'
    })
]



var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        validate: usernameValidator
    },
    password:{
        type: String,
        required: true
    },
    apiToken:{
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema);


module.exports.addUser = function(data, callback){
    
    User.findOne({username: data.username}, {}, function(err, user){
        if(user){
            callback('User Already exist in database.');
        }else{

            bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(data.password, salt, function(err, hash) {

                            data.password = hash;
                            
                            data.save(function(err){
                            if(err){
                                    
                                var errString;
                                errString += err.errors.username === undefined? '': err.errors.username.message + '\n';
                                errString += err.errors.password === undefined? '': err.errors.password.message +'\n';
                                errString += err.errors.apitoken === undefined? '': err.errors.apitoken.message + '\n';
                                callback(err.toString());
                            }else{
                                    callback(false);
                            }

                            });
                        });
            });

        }

    });
}


module.exports.getUser = function(data, callback){

    
    let query = {username: data.username};
    User.findOne(query, {}, function(err, user){
        if(user === undefined){
            callback(err, undefined);
        }else{
            bcrypt.compare(data.password, user.password, function(err, isMatch){
                if(isMatch === false){
                    callback(err, undefined);
                }else{
                     callback(err, user);
                }
            });
        }
    });
}

module.exports.updateToken = function(user, token, callback){

    let query = {username: user.username};
    let updateQuery = {apiToken: token};
    User.findOneAndUpdate(query, updateQuery, function(err, data){
        if(err){
            callback(err, 'API Token Not Updated');
        }

        callback(err, 'API Token Updated');
    });
}

