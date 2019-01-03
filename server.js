const lsws = 'lsws';
const live = 'live';
//parsing command line arguments
const arg = process.argv[2];

const http = require('http'),
  url = require('url'),
  fs = require('fs'),
  port = 1914;

const commands = require('./commands/commands');

let htmlData = undefined;
let jsData = undefined;
fs.readFile(`./client/${arg}.html`, 'utf8', function(err, data) {
    if (err) console.log(`Error reading HTML: ${err}`);
    else htmlData = data;
});

fs.readFile(`./client/${arg}.js`, 'utf8', function(err, data) {
  if (err) return;
  else jsData = data;
});

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url);

  if (req.method === 'GET' && parsedUrl.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'html'});
    res.write(htmlData);
    res.end();
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/scripts.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript'
    });
    res.write(jsData);
    res.end();
  }

  //this callback sends the response with an object
  end = obj => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const json = JSON.stringify(obj);
    res.end(json);
  };


  if (req.method === 'PUT'){
    switch (parsedUrl.pathname) {
        case '/prev':
            commands.prev(end);
            break;
        case '/next':
            commands.next(end);
            break;
        case '/pause':
            commands.pause(end);
            break;
        case '/play':
            commands.play(end);
            break;
        case '/decrescendo':
            commands.decrescendo(end);
            break;
        case '/maxvolume':
            commands.maxvolume(end);
            break;
        case '/volumeup':
            commands.volumeup(end);
            break;
        case '/volumedown':
            commands.volumedown(end);
            break;
        case '/nextslide':
            commands.nextslide(end);
            break;
        case '/prevslide':
            commands.prevslide(end);
            break;
        case '/update':
            commands.update(end);
            break;
        case '/sysvolup':
            commands.sysVolUp(end);
            break;
        case '/sysvoldown':
            commands.sysVolDown(end);
            break;
        case '/swipeleft':
            commands.swipeLeft(end);
            break;
        case '/swiperight':
            commands.swipeRight(end);
            break;
        default:
            console.log("Unknown pathname: " + parsedUrl.pathname)
            res.end();
            break;
    }
  }

}

//starting the server
const server = http.createServer(requestHandler).listen(port);
console.log("Listening on port " + port);

//print the address
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('Address: '+add);
});
