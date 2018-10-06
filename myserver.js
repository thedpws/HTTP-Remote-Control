var http = require('http'),
  fs = require('fs'),
  url = require('url'),
  port = 8080;

var currTrack;

getCurrTrack();

function executeCommand(command, callback) {
  const { execSync } = require('child_process');
// stderr is sent to stdout of parent process
// you can set options.stdio if you want it to go elsewhere
  console.log("\texecute: " + command);
  execSync(command);
  getCurrTrack(callback);
}

function getCurrTrack(callback){
  var spawn = require('child_process').spawn;
  var child = spawn('./scripts/currtrack.sh');
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', data => {
    console.log(data);
    currTrack = data;
  });

  if (callback) callback();

}

function decrescendo(){
  var vol = 10;
  let command = "./scripts/decrescendo.sh";
  executeCommand(command);
  maxvolume();
}

function prev(){
  let command = "sudo osascript -e \'tell application \"iTunes\" to previous track\'";
  executeCommand(command);
  getCurrTrack();
}

function next(callback){
  let command = "sudo osascript -e \'tell application \"iTunes\" to next track\'";
  executeCommand(command, callback);
}

function play(callback) {
  let command = "sudo osascript -e \'tell application \"iTunes\" to play\'";
  executeCommand(command, callback);
}

function pause(callback) {
  let command = "sudo osascript -e \'tell application \"iTunes\" to pause\'";
  executeCommand(command, callback);
}

function maxvolume(callback) {
  //let command = "sudo osascript -e \"set Volume 10\"";
  let command = "sudo osascript -e \'tell app \"iTunes\" to set the sound volume to 100\'";
  executeCommand(command, callback);
}

function volumeup(callback){
  let command = "sudo osascript -e \'tell application \"iTunes\" to set the sound volume to (the sound volume + 10)\'";
  executeCommand(command, callback);
}

function volumedown(callback){
  let command = "sudo osascript -e \'tell application \"iTunes\" to set the sound volume to (the sound volume - 10)\'";
  executeCommand(command, callback);
}

function nextslide(callback){
  let command = 'sudo ./scripts/nextslide.sh';
  executeCommand(command, callback);
}

function prevslide(callback){
  let command = 'sudo ./scripts/prevslide.sh';
  executeCommand(command, callback);
}

function sysVol(level, callback){
  let command = 'sudo osascript -e \'tell application \"System Events\" set'
}

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname === '/') {
    response.writeHead(200, {
      'Content-Type': 'html'
    });

    response.write(htmlData);
    response.end();

  } else if (parsedUrl.pathname === '/scripts.js') {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    });
    response.write(scriptsData);
    response.end();
  } else if (request.method === 'PUT') {

    end = () => response.end();

      switch (parsedUrl.pathname) {
          //music control
          case '/prev':
              prev(end);
              break;
          case '/next':
              next(getCurrTrack(end));
              break;
          case '/pause':
              pause(end);
              break;
          case '/play':
              play(end);
              break;

          //volume control
          case '/decrescendo':
              decrescendo(end);
              break;
          case '/maxvolume':
              maxvolume(end);
              break;
          case '/volumeup':
              volumeup(end);
              break;
          case '/volumedown':
              volumedown(end);
              break;

          //powerpoint
          case '/nextslide':
              nextslide(end);
              break;
          case '/prevslide':
              prevslide(end);
              break;
          default:
              console.log("Unknown pathname: " + parsedUrl.pathname)
              break;
      }

      response.writeHead(200, {
          'Content-Type': 'text/plain'
      });
  } else if (request.method === 'GET' && parsedUrl.pathname === '/next') {

    let sendResponse = () => {
        response.setHeader('Content-Type', 'text/plain');
        response.writeHead(200);
        response.write(currTrack);
        response.end();
    };
    getCurrTrack(sendResponse);
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    });
    response.write("<h1>Error 404: Page not found.</h1>");
    response.end();
  }

};

//reading html data
fs.readFile('index.html', 'utf8', function(err, data) {
  if (err) return;
  else htmlData = data;
});

//reading scripts.js data
fs.readFile('scripts.js', 'utf8', function(err, data) {
  if (err) return;
  else scriptsData = data;
})

//starting the server
server = http.createServer(requestHandler).listen(port);
console.log("Listening on port " + port);

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
})
