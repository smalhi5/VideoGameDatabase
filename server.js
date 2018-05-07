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
    return client.companies({
        ids: gameData.developers
      }, ['name']
    );
  }).then(igdbResponse => {
    // igdbResponse contains an array of matching companies
    gameData.developers = igdbResponse.body;
    // retrieve francise information
    console.log(gameData.franchise);
    if(!gameData["franchise"]){
      var date = new Date(gameData.first_release_date);
      // populate template w/ gameData
      var html = compiledFunction({
        gameName: gameData.name,
        developer: "Developer: " + gameData.developers[0].name,
        storyline: gameData.storyline,
        popularity: "Popularity: " + Math.round(gameData.popularity),
        releaseDate: "Release date: " + date.toString().slice(4, 15),
        franchise: "Franchise name: None",
        gameSummary: gameData.summary,
        gameRating: "Game rating: " + Math.round(gameData.rating),
        coverUrl: gameData.cover.url
      });
      res.send(html);
    }else{
      var html_res = getFranchise(gameData);
      res.send(html_res);
    }
  }).catch(err => {
    console.log(err);
  });
});

app.get('/games', function(req, res) {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      order: 'popularity:desc',
      search: req.query.text
  }, [
      'name',
      'cover'
  ]).then(igdbResponse => {
    //console.log(igdbResponse.body);
    res.send(igdbResponse.body);
  });
});

function getFranchise(gamedataset){
  var games = gamedataset
  return client.franchises({
    ids: [games.franchise]
  },[
      'name'
  ]).then(igdbResponse => {
    console.log(igdbResponse.body)
    games.franchise = igdbResponse.body[0];
    console.log('works here');
    var date = new Date(games.first_release_date);
    var html = compiledFunction({
      gameName: games.name,
      developer: "Developer: " + games.developers[0].name,
      storyline: games.storyline,
      popularity: "Popularity: " + Math.round(games.popularity),
      releaseDate: "Release date: " + date.toString().slice(4, 15),
      franchise: "Franchise name: " + games.franchise.name,
      gameSummary: games.summary,
      gameRating: "Game rating: " + Math.round(games.rating),
      coverUrl: games.cover.url
    });
    return html;
  }).catch(err => {
    console.log(err);
  });
}


app.listen(PORT, function () {
  console.log('Listing To Port');
});
