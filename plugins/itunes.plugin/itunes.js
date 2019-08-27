const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script, next) => {
    exec(`osascript ./plugins/itunes.plugin/${script}`, (stdout, stderr) => next());
}


router.use('/play', (req, res, next) => {
    // send play to itunes
    //console.log('itunes play');
    execute('play.scpt', next);
});

router.use('/pause', (req, res, next) => {
    // send pause to itunes
    //console.log('itunes pause');
    execute('pause.scpt', next);
});

router.use('/next', (req, res, next) => {
    // send next to itunes
    //console.log('itunes next');
    execute('next.scpt', next);
});

router.use('/prev', (req, res, next) => {
    // send prev to itunes
    //console.log('itunes prev');
    execute('prev.scpt', next);
});

router.use('/dec', (req, res, next) => {
    // send dec to itunes
    //console.log('itunes decrescendo');
    execute('dec.scpt', next);
});

router.use('/volup', (req, res, next) => {
    // send volume up to itunes
    //console.log('itunes volume up');
    execute('volup.scpt', next);
});
router.use('/voldown', (req, res, next) => {
    // send volume down to itunes
    //console.log('itunes volume down');
    execute('voldown.scpt', next);
    res.status(200);
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
            if (stderr) console.log(stderr);
            parse(stdout, info => {
                res.plugins.itunes = info;
                next();
            });
        });
    },
    router: router,
    route: '/itunes'
}
