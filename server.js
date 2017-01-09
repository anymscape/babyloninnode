var http = require('http'),
    path = require('path'),
    fs = require('fs'),

extensions = {                                                          //<--specify MIME file types.
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".babylon" : "application/babylon"                                   //<--- ADD .babylon MIME type.
};

//helper function handles file verification
function getFile(filePath,res,page404,mimeType){
    //does the requested file exist?
    fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read file and send response.
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    res.writeHead(200,{
                        "Content-type" : mimeType,                      //<-- SET dynamic MIME TYPE.
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                }
            });
        }
    });
};

//handler for HTTP requests
function requestHandler(req, res) {
    var fileName = path.basename(req.url) || 'index.html',
        ext = path.extname(fileName),
        localFolder = __dirname + '/public/',
        page404 = localFolder + '404.html';

    if(!extensions[ext]){                                                //<-- CHECK file MIME type.
        //for now just send a 404 and a short message
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("Not Found");
    };

    getFile((localFolder + fileName),res,page404,extensions[ext]);
};

http.createServer(requestHandler).listen(8008);

console.log('Node server is running on http://localhost:8008');