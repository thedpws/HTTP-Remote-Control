const express = require('express');
const router = express.Router();


router.post('/slideright', (req, res) => {
    // send slideright to taskswitcher
    console.log('taskswitcher slideright');
    res.sendStatus(501);
});

router.post('/slideleft', (req, res) => {
    // send slideleft to taskswitcher
    console.log('taskswitcher slideleft');
    res.sendStatus(501);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins.taskswitcher = 'taskswitcher support';
        next();
    },
    router: router
}
