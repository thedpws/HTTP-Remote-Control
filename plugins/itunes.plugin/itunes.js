const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script) => {
    exec(`osascript ./plugins/itunes.plugin/${script}`);
}


router.post('/play', (req, res) => {
    // send play to itunes
    //console.log('itunes play');
    execute('play.scpt');
    res.sendStatus(200);
});

router.post('/pause', (req, res) => {
    // send pause to itunes
    //console.log('itunes pause');
    execute('pause.scpt');
    res.sendStatus(200);
});

router.post('/next', (req, res) => {
    // send next to itunes
    //console.log('itunes next');
    execute('next.scpt');
    res.sendStatus(200);
});

router.post('/prev', (req, res) => {
    // send prev to itunes
    //console.log('itunes prev');
    execute('prev.scpt');
    res.sendStatus(200);
});

router.post('/dec', (req, res) => {
    // send dec to itunes
    //console.log('itunes decrescendo');
    execute('dec.scpt');
    res.sendStatus(200);
});

router.post('/volup', (req, res) => {
    // send volume up to itunes
    //console.log('itunes volume up');
    execute('volup.scpt');
    res.sendStatus(200);
});
router.post('/voldown', (req, res) => {
    // send volume down to itunes
    //console.log('itunes volume down');
    execute('voldown.scpt');
    res.sendStatus(200);
});

function parse(output, cb) {
    if (output == null) 
    { 
        cb(null);
        //console.log('output is null');
        return;
    }
    infos = output.split("$");
    const res = {};
    res.trackname = infos[0];
    res.trackduration = infos[1];
    res.trackpos = infos[2];
    res.playerstatus = infos[3];
    res.playervolume = infos[4];
    res.nexttrackname = infos[5];
    cb(res);
}
module.exports = {
    middleware: (req, res, next) => {
        // send current track, position, duration, next track
        exec('osascript ./plugins/itunes.plugin/getinfo.scpt', (stderr, stdout) => {
            //if (stderr) console.log(stderr);
            parse(stdout, info => {
                res.plugins.itunes = info
                next()
            });
        });
    },
    router: router
}
