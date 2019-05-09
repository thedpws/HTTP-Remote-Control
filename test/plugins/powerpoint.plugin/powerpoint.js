const express = require('express');
const router = express.Router();


router.post('/nextslide', (req, res) => {
    // send play to powerpoint
    console.log('ppt next');
    res.sendStatus(501);
});

router.post('/prevslide', (req, res) => {
    // send pause to powerpoint
    console.log('ppt previous');
    res.sendStatus(501);
});


module.exports = {
    middleware: (req, res, next) => {
        // send current track, position, duration, next track
        res.plugins.powerpoint = 'powerpoint support';
        next();
    },
    router: router
}
