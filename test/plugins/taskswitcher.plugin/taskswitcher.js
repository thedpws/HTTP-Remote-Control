const express = require('express');
const router = express.Router();
const shell = require('shelljs');
const execute = (script) => {
    shell.exec(`osascript ./plugins/taskswitcher.plugin/${script}`);
}


router.post('/slideright', (req, res) => {
    // send slideright to taskswitcher
    console.log('taskswitcher slideright');
    execute('right.scpt');
    res.sendStatus(501);
});

router.post('/slideleft', (req, res) => {
    // send slideleft to taskswitcher
    console.log('taskswitcher slideleft');
    execute('left.scpt');
    res.sendStatus(501);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins.taskswitcher = 'taskswitcher support';
        next();
    },
    router: router
}
