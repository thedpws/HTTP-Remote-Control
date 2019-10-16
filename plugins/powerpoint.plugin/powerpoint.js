const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script, next) => {
    exec(`osascript ./plugins/powerpoint.plugin/${script} &`, (stdout, stderr) => next());
}

router.use('/nextslide', (req, res, next) => {
    // send play to powerpoint
    console.log('ppt next');
    execute('next.scpt', next);
});

router.use('/prevslide', (req, res, next) => {
    // send pause to powerpoint
    console.log('ppt previous');
    execute('prev.scpt', next);
});


module.exports = {
    middleware: (req, res, next) => {
        // send current track, position, duration, next track
        res.plugins.powerpoint = 'powerpoint support';
        next();
    },
    router: router,
    route: '/powerpoint'
}
