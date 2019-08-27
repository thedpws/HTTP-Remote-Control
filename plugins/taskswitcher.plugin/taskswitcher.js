const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script, next) => {
    exec(`osascript ./plugins/taskswitcher.plugin/${script}`, (stdout, stderr) => next());
}


router.use('/slideright', (req, res, next) => {
    // send slideright to taskswitcher
    console.log('taskswitcher slideright');
    execute('right.scpt', next);
});

router.use('/slideleft', (req, res, next) => {
    // send slideleft to taskswitcher
    console.log('taskswitcher slideleft');
    execute('left.scpt', next);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins['task-switcher'] = 'task-switcher support';
        next();
    },
    router: router,
    route: '/task-switcher'
}
