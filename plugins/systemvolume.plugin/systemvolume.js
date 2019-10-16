const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script, next) => {
    exec(`osascript ./plugins/systemvolume.plugin/${script} &`, (stderr, stdout) => next())
}


router.use('/increase', (req, res, next) => {
    // send increase to systemvolume
    console.log('sysvol increase');
    execute('increase.scpt', next);
});

router.use('/decrease', (req, res, next) => {
    // send decrease to systemvolume
    console.log('sysvol decrease');
    execute('decrease.scpt', next);
});


module.exports = {
    middleware: (req, res, next) => {
        exec('osascript ./plugins/systemvolume.plugin/getinfo.scpt', (stderr, stdout) => {
            res.plugins['system-volume'] = {};
            res.plugins['system-volume']['system-volume'] = stdout.replace('\n', '');;
            next();
            });
    },
    router: router,
    route: '/system-volume'
}
