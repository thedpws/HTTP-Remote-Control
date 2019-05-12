const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script) => {
    exec(`osascript ./plugins/systemvolume.plugin/${script}`);
}


router.post('/increase', (req, res) => {
    // send increase to systemvolume
    console.log('sysvol increase');
    execute('increase.scpt');
    res.sendStatus(200);
});

router.post('/decrease', (req, res) => {
    // send decrease to systemvolume
    console.log('sysvol decrease');
    execute('decrease.scpt');
    res.sendStatus(200);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins.systemvolume = 'systemvolume support';
        next();
    },
    router: router
}
