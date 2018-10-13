const fs = require('fs');

let html = undefined;
let js = undefined;

//reading html data
fs.readFile('./index.html', 'utf8', function(err, data) {
  if (err) return;
  else exports.html = data;
});

//reading scripts.js data
fs.readFile('./scripts.js', 'utf8', function(err, data) {
  if (err) return;
  else exports.js = data;
});
