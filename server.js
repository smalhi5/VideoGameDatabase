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
      getFranchise(gameData).then(function(games_data){
        console.log(games_data.name);
        var date = new Date(games_data.first_release_date);
        var html_2 = compiledFunction({
          gameName: games_data.name,
          developer: "Developer: " + games_data.developers[0].name,
          storyline: games_data.storyline,
          popularity: "Popularity: " + Math.round(games_data.popularity),
          releaseDate: "Release date: " + date.toString().slice(4, 15),
          franchise: "Franchise name: " + games_data.franchise.name,
          gameSummary: games_data.summary,
          gameRating: "Game rating: " + Math.round(games_data.rating),
          coverUrl: games_data.cover.url
        });
        console.log('work here 3');
        res.send(html_2);
      });
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
    console.log('works here');
    games.franchise = igdbResponse.body[0];
    console.log('works here 2');
    console.log(games.name);
    return games;
  }).catch(err => {
    console.log(err);
  });
}


app.listen(PORT, function () {
  console.log('Listing To Port');
});
