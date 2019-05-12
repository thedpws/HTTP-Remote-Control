const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script) => {
    exec(`osascript ./plugins/powerpoint.plugin/${script}`);
}

router.post('/nextslide', (req, res) => {
    // send play to powerpoint
    console.log('ppt next');
    execute('next.scpt');
    res.sendStatus(200);
});

router.post('/prevslide', (req, res) => {
    // send pause to powerpoint
    console.log('ppt previous');
    execute('prev.scpt');
    res.sendStatus(200);
});


module.exports = {
    middleware: (req, res, next) => {
        // send current track, position, duration, next track
        res.plugins.powerpoint = 'powerpoint support';
        next();
    },
    router: router
}
