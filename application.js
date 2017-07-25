'use strict'

//Require built in modules
const http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

//Database Connection and token setup
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

//Require manual setup db functions file
const db = require('./database/db.js');
db.createDatabase();
db.createCollection("user");


//Configure Port for deploying on heroku or local.
const PORT = process.env.PORT || 8000;


//Mimetypes object for writeHead
const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
    "json": "application/json"
};

//Assets Path
const assets = {
    "js": "./assets/js/",
    "html": "./assets/html/",
    "css": "./assets/css/"
}

function checkJsonObject(data){
    console.log(data);
    //Check for password of 8 or more characters having >1 special characters and >1 uppercase letter
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(data.password === data.confirmpassword && data.password !== ''){
        if(re.test(data.password) && data.username !== ''){
            if(db.getUserByUsername(data.username, function(err, user){
                if(err) throw err;
                if(user){
                    console.log('User already exists');
                    return false;
                }else{
                    db.insertUser(data, function(err, user){
                        if(err) throw err;
                        if(user){
                            console.log('User Inserted');
                            return true;
                        }
                    });
                } 
            }));
        }
    }
    
}


try{
    //Create http server listening on defined port.
    http.createServer(function(req, res){
        
        let parsedUrl = url.parse(req.url, true);
        let path = parsedUrl.pathname;
        let getFullData = '';
        let sendFullData = '';
        if(req.method == 'GET' && path == '/'){

            fs.readFile(assets.html + 'index.html', function(err, data){
                if(err){
                    res.writeHead(500, {'Content-type': mimeTypes.html});
                    res.end(err);
                };
                res.writeHead(200, {'Content-type': mimeTypes.html});
                res.end(data + PORT+ '</p>');
            });

        }else if(req.method == 'POST' && path == '/api/signup'){

            req.on('data', function(chunk){
                getFullData += chunk;
            });
            
            let strategy = checkJsonObject(getFullData);

            req.on('end', function(){
                
                res.writeHead(200, {'Content-type': mimeTypes.html});
                if(strategy){
                    res.end('User Created.');
                }else{
                    res.end('Not able to create user. Please check username or password');
                }
                
            });
        }



    }).listen(PORT, function(){
        console.log("Server started at port " + PORT );
    });
}catch(exception){
    res.writeHead(500, {'Content-type':'text/plain' });
    res.end("Internal Server Error");
}