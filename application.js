'use strict'

//Require built in modules
const http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

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


try{
    //Create http server listening on defined port.
    http.createServer(function(req, res){
        
        let parsedUrl = url.parse(req.url, true);
        let path = parsedUrl.pathname;
        let fullData ='';
        if(req.method == 'GET' && path == '/'){

            fs.readFile(assets.html + 'index.html', function(err, data){
                if(err){
                    res.writeHead(500, {'Content-type': mimeTypes.html});
                    res.end(err);
                };
                res.writeHead(200, {'Content-type': mimeTypes.html});
                res.end(data);
            });

        }



    }).listen(PORT, function(){
        console.log("Server started at port " + PORT );
    });
}catch(exception){
    html.writeHead(500, {'Content-type':'text/plain' });
    html.end("Internal Server Error");
}