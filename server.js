"use strict";

// PORT definition
const PORT = 3000;

// Import the HTTP library
const http = require('http');

// Import the fs library 
const fs = require('fs');

//igdb api creation and client
const igdb = require('igdb-api-node').default;
const client = igdb('c2604f4341df19f02c8b176b621d9e2e');

const express = require('express');
const app = express();

const cache = {};
cache['search.html'] = fs.readFileSync('public/search.html');
cache['search.css'] = fs.readFileSync('public/search.css');

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.sendfile('public/search.html'); 
});

app.get('/games', function(req, res) {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.query.text
  }, [
      'name',
      'cover'
  ]).then(igdbResponse => {
    res.send(igdbResponse.body);
  }); 
});

app.get('/games', function(req, res) {
  client.image({
    cloudinary_id: res.peram.id;
  }, 'micro', 'jpg');

  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.query.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  }); 
});

app.listen(PORT, function () {
  console.log('Listing To Port');
});