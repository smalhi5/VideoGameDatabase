"use strict";

// PORT definition
const PORT = 3000;

// Import the HTTP library
const http = require('http');

// Import the fs library 
const fs = require('fs');

const cache = {};
cache['search.html'] = fs.readFileSync('public/search.html');
cache['search.css'] = fs.readFileSync('public/search.css');

function serveIndex(path, res) {
    fs.readdir(path, function(err, files) {
        if(err) {
            console.error(err);
            res.statusCode = 500;
            res.end("Server Error");
        }
        var html = "<p>Index of " + path + "</p>";
        html += "<ul>";
        html += files.map(function(item){
            return "<li><a href='" + item + "'>" + item + "</a></li>";
        }).join("");
        html += "</ul>";
        res.end(html);
    });
}

/** @function serveFile
 * Serves the specified file with the provided response object
 * @param {string} path - specifies the file path to read 
 * @param {http.serverResponse} res - the http response object
 */
function serveFile(path, res) {
    fs.readFile(path, function(err, data) {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end("Server Error: Could not read file");
          return;
        }
        res.end(data);
    });
}

/** @function handleRequest 
 * Request handler for our http server 
 * @param {http.ClientRequest} req - the http request object
 * @param {http.ServerResponse} res - the http response object
 */
function handleRequest(req, res) {
    // Map request urls to files
    switch(req.url) {
        case '/':
            serveIndex('public', res);
            break;
        case '/search.html':
            //res.end(cache['openhouse.html']);
            serveFile('public/openhouse.html', res);
            break;
        case '/search.css':
            //res.end(cache['openhouse.css']);
            serveFile('public/openhouse.css', res);
            break;
        default:
            res.statusCode = 404;
            res.end("File Not Found");
    }
}

// Create the web server
var server = http.createServer(handleRequest);

// Start listening on port PORT
server.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});