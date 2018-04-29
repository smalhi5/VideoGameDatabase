"use strict";

var fs = require('fs');

module.exports = {
  render: render,
  loadDir: loadDir
}

function render(template, context) {
  return templates[templateName].replace(/<%=(.*)%>/g, function(match, js){
    return eval("var context = " + JSON.stringify(context) + ";" + js);
  });
}

function loadDir(directory){
  var dir = fs.readdirSync(directory);
  dir.forEach(function(File){
    var path = directory + '/' + file;
    var stats = fs.statSync(path);
    if(stats.isFile()){
      templates[file] = fs.readFileSync(path).toString();
    }
  });
}