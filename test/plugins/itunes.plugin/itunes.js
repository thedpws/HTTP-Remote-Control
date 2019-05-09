const express = require('express');
const router = express.Router();
const shell = require('shelljs');
const execute = (script) => {
    shell.exec(`osascript ./plugins/itunes.plugin/${script}`);
}


router.post('/play', (req, res) => {
    // send play to itunes
    console.log('itunes play');
    execute('play.scpt');
    res.sendStatus(501);
});

router.post('/pause', (req, res) => {
    // send pause to itunes
    console.log('itunes pause');
    execute('pause.scpt');
    res.sendStatus(501);
});

router.post('/next', (req, res) => {
    // send next to itunes
    console.log('itunes next');
    execute('next.scpt');
    res.sendStatus(501);
});

router.post('/prev', (req, res) => {
    // send prev to itunes
    console.log('itunes prev');
    execute('prev.scpt');
    res.sendStatus(501);
});

router.post('/dec', (req, res) => {
    // send dec to itunes
    console.log('itunes decrescendo');
    execute('dec.scpt');
    res.sendStatus(501);
});

router.post('/volup', (req, res) => {
    // send volume up to itunes
    console.log('itunes volume up');
    execute('volup.scpt');
    res.sendStatus(501);
});
router.post('/voldown', (req, res) => {
    // send volume down to itunes
    console.log('itunes volume down');
    execute('voldown.scpt');
    res.sendStatus(501);
});

module.exports = {
    middleware: (req, res, next) => {
        // send current track, position, duration, next track
        res.plugins.itunes = 'itunes support';
        next();
    },
    router: router
}
