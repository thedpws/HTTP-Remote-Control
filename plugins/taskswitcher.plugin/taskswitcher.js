const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script) => {
    exec(`osascript ./plugins/taskswitcher.plugin/${script}`);
}


router.post('/slideright', (req, res) => {
    // send slideright to taskswitcher
    console.log('taskswitcher slideright');
    execute('right.scpt');
    res.status(200).send(res.plugins);
});

router.post('/slideleft', (req, res) => {
    // send slideleft to taskswitcher
    console.log('taskswitcher slideleft');
    execute('left.scpt');
    res.status(200).send(res.plugins);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins['task-switcher'] = 'task-switcher support';
        next();
    },
    router: router,
    route: '/task-switcher'
}
