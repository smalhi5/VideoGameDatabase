"use strict"

var input = document.getElementById('userInput');

document.querySelector('form.search').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();
    console.log(input.value);

    fetch("/games?text=" + encodeURIComponent(input.value)).then(function (res){
        return res.json()
    }).then(function (results){
        var searchResults = document.querySelector("#searchResults");
        searchResults.innerHTML = "";
        for(var i = 0; i < results.length; i++){
            var img = document.createElement("img");
            img.src = results[i].cover.url;
            var node = document.createElement("a");
            node.text = results[i].name;
            node.href = "/games/" + results[i].id;
            node.appendChild(img);
            searchResults.appendChild(node);
            var br = document.createElement("br");
            searchResults.appendChild(br);
        }
    });
});
