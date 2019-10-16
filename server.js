const express = require('express');
const app = express();
const arg = process.argv[2];

// Serve static files
app.use(express.static('public'));

// Morgan request logger
//const morgan = require('morgan');
//app.use(require('morgan')('tiny'));
app.use('*', (req, res, next) => {
  console.log(req.baseUrl)
  next()
});

// Choose set of middleware to use
// Prepare the response for plugins

app.use('/', (req, res, next) => {
    res.plugins = {};
    next();
});

let plugins;

switch(arg){
    case 'live':
        plugins = require('./live');
        break;
    case 'lsws':
        plugins = require('./lsws');
        break;
    default:
        console.log(`Bad argument ${arg}. Exiting with exit code 1`);
        process.exit(1);
        break;
}


// use routers per route
plugins.forEach(plugin => app.use(plugin.route, plugin.router));
plugins.forEach(plugin => app.use('/update', plugin.middleware));
plugins.forEach(plugin => app.use(plugin.route, plugin.middleware));

app.all('/update', (req, res) => (res.status(200).send(res.plugins)));
app.all('*', (req, res) => (res.status(200).send(res.plugins)));

const ip = require('ip');
const port = 1914;
const server = app.listen(port, () => console.log(`Started on ${require('ip').address()}:${port}`));
