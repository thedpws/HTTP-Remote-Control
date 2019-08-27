const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const execute = (script) => {
    exec(`osascript ./plugins/systemvolume.plugin/${script}`);
}


router.post('/increase', (req, res) => {
    // send increase to systemvolume
    console.log('sysvol increase');
    execute('increase.scpt');
    res.status(200).send(res.plugins);
});

router.post('/decrease', (req, res) => {
    // send decrease to systemvolume
    console.log('sysvol decrease');
    execute('decrease.scpt');
    res.status(200).send(res.plugins);
});


module.exports = {
    middleware: (req, res, next) => {
        exec('osascript ./plugins/systemvolume.plugin/getinfo.scpt', (stderr, stdout) => {
            res.plugins['system-volume'] = stdout.replace('\n', '');;
            next();
            });
    },
    router: router,
    route: '/system-volume'
}
