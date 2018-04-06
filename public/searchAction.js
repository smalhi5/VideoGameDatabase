"use strict"

var input = document.getElementById('userInput');

document.querySelector('form.search').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(input.value);
});

/// How to get input from user and then search via the API for the data on 
/// the specified game???

/// I think the following is the endpoint that we will end up using...?

/*
    Search for up to [limit] [user_input] games
    Can filter it by release date, rating, etc
    Can sort it be release date, rating, etc
*/

/* client.games({
    limit: 20,              // limits the amount of results to 20 (default is 10, max = 50)
    offset: 0,              // offset will start a position [i] and give the [limit] results after that
    search: 'user_input'    // search with the input given by the user
}, [
    'name',                 // the game's name
    'release_dates.date',   // the game's initial release date
    'rating',               // average user rating
    'summary',              // summary of the game
    'cover'                 // image object reference, see  https://igdb.github.io/api/misc-objects/image/ 
                            // can access the url for the image if we want to include that somehow
]).then(log); */