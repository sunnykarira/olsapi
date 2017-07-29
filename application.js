'use strict'

//Require built in modules
const http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

//Database Connection and token setup
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//Configure Port for deploying on heroku or local.
const PORT = process.env.PORT || 10450;

//Require User model
var User = require('./models/user.js');
var Product = require('./models/product.js');

//Require Configuration
const config = require('./config.js');

//Secret
const secret = config.secret;

//Make Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});
const db = mongodb.connection;

//Mimetypes object for writeHead
const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
    "json": "application/json",
    "text": "text/plain"
};

//Assets Path
const assets = {
    "js": "./assets/js/",
    "html": "./assets/html/",
    "css": "./assets/css/"
}



//Function to check if Password is valid or not and matches with confirm password
function checkPassword(password, confirmpassword){

    //Check for password of 8 or more characters having >1 special characters and >1 uppercase letter
    let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(password === confirmpassword && password !== '' && password !== undefined){
            if(re.test(password)){
                return true;
            }else{
                return false;
            }           
    }

}

function checkPassword(password){

    //Check for password of 8 or more characters having >1 special characters and >1 uppercase letter
    let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(password != '' && password != undefined){
            if(re.test(password)){
                return true;
            }else{
                return false;
            }           
    }
}

function authMiddleware(username, password, confirmpassword){
    
    if(username == undefined || password == undefined || confirmpassword == undefined){
        return false;
    }

    if(checkPassword(password, confirmpassword)){
        return true;
    }else{
        return false;
    }
}

function authMiddleware(username, password){
    if(username == undefined || password == undefined){
        return false;
    }

    if(checkPassword(password)){
        return true;
    }else{
        return false;
    }
}


function generateToken(req, user){

    // By default, expire the token after 7 days.
    // NOTE: the value for 'exp' needs to be in seconds since
    // the epoch as per the spec!
    let expiresDefault = Math.floor(new Date().getTime()/1000) + 7*24*60*60;

    let token = jwt.sign({
    auth:  user.username,
    agent: req.headers['user-agent'],
    exp: expiresDefault
    }, secret);

    return token;
}

function tokenMiddleware(token){

    let decoded;
    try{

        decoded = jwt.verify(token, config.secret);
    }catch(exception){
        return false;
    }

    if(decoded && decoded.auth == localUser.username){
        return true;
    }else{
        return false;
    }
}


var localUser = undefined;



try{
    //Create http server listening on defined port.
    http.createServer(function(req, res){
        
        let parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;

        if(req.method == 'GET' && pathname == '/'){

            fs.readFile(assets.html + 'index.html', function(err, data){
                if(err){
                    res.writeHead(500, {'Content-type': mimeTypes.html});
                    res.end(err);
                };
                res.writeHead(200, {'Content-type': mimeTypes.html});
                res.end(data + PORT+ '</p>');
            });

        }else if(req.method == 'POST' && pathname == '/api/signup'){

            var getFullData = '';

            req.on('data', function(chunk){
                getFullData += chunk;
            }).on('end', function(){
                
                //Parsing into JSON data
                getFullData = JSON.parse(getFullData);

                //Auth strategy to check if username, password exists and are valid or not
                let passwordCheck = checkPassword(getFullData.password, getFullData.confirmpassword);

                //If auth is valid
                if(passwordCheck){

                    //Create new user object by mongoose schema
                    let newUser = new User();
                    newUser.username = getFullData.username;
                    newUser.password = getFullData.password;

                    //Add user functionality
                    User.addUser(newUser, function(err){
                        res.writeHead(200, {'Content-type': mimeTypes.html});
                        if(err){
                            res.end(err);
                        }else{
                            res.end('User Added. Please visit /api/authenticate to get the web token.');
                        }
                    });

                }else{
                    // Invalid Password
                    res.writeHead(200, {'Content-type': mimeTypes.html});
                    res.end('Invalid Password.');
                }


            });

        }else if(req.method == 'POST' && pathname == '/api/authenticate'){

            var getFullData = '';

            req.on('data', function(chunk){
                getFullData += chunk;
            }).on('end', function(){

                getFullData = JSON.parse(getFullData);

                let passwordCheck = checkPassword(getFullData.password);
                
                if(passwordCheck){

                    User.getUser(getFullData, function(err, user){

                        if(user === undefined){
                            res.writeHead(200, {'Content-type': mimeTypes.html});
                            res.end('User or Password Incorrect.');
                        }else{

                            let token = generateToken(req, user);
                            User.updateToken(user, token, function(err, response){
                                console.log(response);
                                if(err) throw err;

                                res.writeHead(200, {'Content-type': mimeTypes.html});
                                res.end("Your API token is "  + token);

                            });
                            
                        }

                    });
                }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end("Invalid Password.");                    
                }

            });


        }else if(req.method == 'POST' && pathname == '/api/login'){
            var getFullData = '';

            req.on('data', function(chunk){
                getFullData += chunk;
            }).on('end', function(){

                getFullData = JSON.parse(getFullData);
                let auth = authMiddleware(getFullData.username, getFullData.password);

                if(auth){
                    User.getUser(getFullData, function(err, user){

                        if(user === undefined){
                            res.writeHead(200, {'Content-type': mimeTypes.html});
                            res.end('User not Found');
                        }else{

                            console.log('You are logged in. Please provide apitoken for next routes.');
                            localUser = user;
                            res.writeHead(200, {'Content-type': mimeTypes.text});
                            res.end('You are logged in. Please provide apitoken for next routes.');
                            
                        }


                    });
                }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Invalid data entered. Field Missing.');
                }

            });

        }else if(req.method == 'GET' && pathname == '/api/product'){
            
            if(localUser != undefined){
                let token = req.headers.token || parsedUrl.query.token;
                let midRes = tokenMiddleware(token);
                if(midRes){
                    
                    Product.getAllProducts(function(err, data){
                        if(err){
                            res.writeHead(400, {'Content-type': mimeTypes.text});
                            res.end(err);                            
                        }else{
                            res.writeHead(200, {'Content-type': mimeTypes.text});
                            res.end((data));
                        }
                    });


                }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Please provide correct token in header.');
                }                
            }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Login to access this route.');                
            }


        }else if(req.method == 'POST' && pathname == '/api/product'){

            var getFullData = '';
            req.on('data', function(chunk){
                getFullData += chunk;
            }).on('end', function(){

                if(localUser != undefined){

                    getFullData = JSON.parse(getFullData);
                    let token = req.headers.token || parsedUrl.query.token;
                    let midRes = tokenMiddleware(token);
                    if(midRes){

                        //let auth = productAddMiddleware(getFullData);
                        let product = new Product();
                        Object.assign(product, getFullData);
        
                        Product.addProduct(product, function(err){
                            if(err){
                                res.writeHead(200, {'Content-type': mimeTypes.text});
                                //console.log(err);
                                res.end(err);                              
                            }else{
                                res.writeHead(200, {'Content-type': mimeTypes.text});
                                res.end('Product Added to database');
                            }
                                
                        });

                    }else{
                        res.writeHead(200, {'Content-type': mimeTypes.text});
                        res.end('Please provide correct token in header.');                    
                    }                   

                }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Please login to access this route.');                      
                }

                
            });
        }else if(req.method == 'DELETE' && pathname == '/api/product'){

            if(localUser != undefined){
                let token = req.headers.token || parsedUrl.query.token;
                let midRes = tokenMiddleware(token);
                if(midRes){
                    
                        let query;
                        let id = parsedUrl.query.id;
                        let name = parsedUrl.query.name;
                        let category = parsedUrl.query.category;

                        if(id){
                            query = {_id: id};
                            Product.deleteItem(query, function(err){
                                if(err){
                                    res.writeHead(400, {'Content-type': mimeTypes.text});
                                    res.end(err);                                
                                }else{
                                    res.writeHead(200, {'Content-type': mimeTypes.text});
                                    res.end('Products Deleted.');  
                                }
                            });

                        }else if(name !=undefined && category != undefined){

                            name = name.toLowerCase();
                            category = category.toLowerCase();
                            query = {name: name, category: category};
                            Product.deleteItem(query, function(err){
                                if(err){
                                    res.writeHead(400, {'Content-type': mimeTypes.text});
                                    res.end(err);                                
                                }else{
                                    res.writeHead(200, {'Content-type': mimeTypes.text});
                                    res.end('Products Deleted.');  
                                }
                            });

                        }else if(name){

                            name = name.toLowerCase();
                            query = {name: name};
                            Product.deleteItem(query, function(err){
                                if(err){
                                    res.writeHead(400, {'Content-type': mimeTypes.text});
                                    res.end(err);                                
                                }else{
                                    res.writeHead(200, {'Content-type': mimeTypes.text});
                                    res.end('Products Deleted.');  
                                }
                            });

                        }else if(category){

                            category = category.toLowerCase();
                            query = {category: category};
                            Product.deleteItem(query, function(err){
                                if(err){
                                    res.writeHead(400, {'Content-type': mimeTypes.text});
                                    res.end(err);                                
                                }else{
                                    res.writeHead(200, {'Content-type': mimeTypes.text});
                                    res.end('Products Deleted.');  
                                }
                            });                            
                        }else{
                            res.writeHead(400, {'Content-type': mimeTypes.text});
                            res.end('Bad Request.');
                        }


                }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Please provide correct token in header.');
                }
                
            }else{
                    res.writeHead(200, {'Content-type': mimeTypes.text});
                    res.end('Login to access this route.');                
            }            

                
        }



    }).listen(PORT, function(){
        console.log("Server started at port " + PORT );
    });
}catch(exception){
    res.writeHead(500, {'Content-type': mimeTypes.text});
    res.end("Internal Server Error");
}