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
            var li = document.createElement("li");
            var img = document.createElement("img");
            img.src = results[i].cover.url;
            if (!results[i]["cover"]){
                img.src = "https://dummyimage.com/90x90/000/0011ff.jpg&text=no+image+available+";
            }else{
                img.src = results[i].cover.url;
            }
            var node = document.createElement("a");
            li.appendChild(node);
            node.text = results[i].name;
            node.href = "/games/" + results[i].id;
            node.appendChild(img);
            searchResults.appendChild(li);
        }
    });
});
