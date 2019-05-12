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
let router;
switch(arg){
    case 'live':
        console.log('Attached plugins for live service.');
        router = require('./live.router');
        break;
    case 'lsws':
        console.log('Attached plugins for live stream service.');
        router = require('./lsws.router');
        break;
    default:
        console.log(`Bad argument ${arg}. Exiting with exit code 1`);
        process.exit(1);
        break;
}
app.use('/', router);

/*
// DEBUG: Prints out response
app.use('/', (req, res, next) => {
    console.log(res);
    next();
});
*/

const server = app.listen(1914, () => console.log("Started on port 1914"));
