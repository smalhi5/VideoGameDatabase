"use strict";

// PORT definition
const PORT = 3000;

// Import the HTTP library
const http = require('http');

// Import the fs library
const fs = require('fs');

// Import the Pug library
const pug = require('pug');
// Compile the source code
const compiledFunction = pug.compileFile('views/template.pug');

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

app.set('view engine', 'pug');

app.get('/games/:id', function(req, res) {
  var gameData;

  client.games({
      ids: [req.params.id]
  }, [
      'name',
      'cover',
      'summary',
      'storyline',
      'popularity',
      'rating',
      'rating_count',
      'first_release_date',
      'developers',
      'franchise'
  ]).then(igdbResponse => {
    gameData = igdbResponse.body[0];
    // retrieve developer data
    var developers = gameData.developers.map((id) => {
      return client.companies({
        id: gameData.developers[0]
      },[
        'name'
      ])
    });
    return Promise.all(developers);
  }).then(igdbResponses => {
    // save developer data
    gameData.developers = igdbResponses.map(response => {
      return response.body[0];
    });

    // retrieve francise information
    return client.franchises({
      ids: [gameData.franchise]
    },[
      'name'
    ]);
  }).then(igdbResponse => {
    gameData.franchise = igdbResponse.body;
    var date = new Date(gameData.first_release_date);
    console.log("Franchise name: " + gameData.franchise.name);
    for (var a in gameData.developers){
      console.log(gameData.developers[a]);
    }
    // populate template w/ gameData
    var html = compiledFunction({
      gameName: gameData.name,
      developer: "Developer: " + gameData.developers[0].name,
      storyline: "Storyline: " + gameData.storyline,
      popularity: "Popularity: " + Math.round(gameData.popularity),
      releaseDate: "Release date: " + date,
      franchise: "Franchise name: " + gameData.franchise.name,
      gameSummary: gameData.summary,
      gameRating: Math.round(gameData.rating),
      coverUrl: gameData.cover.url
    });
    //console.log(igdbResponse.body);
    // res.send rendered template
    //res.send(gameData);
    res.send(html);
  }).catch(err => {
    console.log(err);
  });
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
    console.log(igdbResponse.body);
    res.send(igdbResponse.body);
  });
});


app.listen(PORT, function () {
  console.log('Listing To Port');
});
