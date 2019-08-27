const express = require('express');
const app = express();
const arg = process.argv[2];

// Serve static files
app.use(express.static('public'));

// Morgan request logger
const morgan = require('morgan');
app.use(morgan('tiny'));

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

// use all middleware
plugins.forEach(plugin => app.use(plugin.middleware));

// use routers per route
plugins.forEach(plugin => app.use(plugin.route, plugin.router));

app.all('/plugins', (req, res) => (res.status(200).send(res.plugins)));
app.all('*', (req, res) => res.status(404).send('Bad Route'));

const server = app.listen(1914, () => console.log("Started on port 1914"));
