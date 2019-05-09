const express = require('express');
const router = express.Router();


router.post('/increase', (req, res) => {
    // send increase to systemvolume
    console.log('sysvol increase');
    res.sendStatus(501);
});

router.post('/decrease', (req, res) => {
    // send decrease to systemvolume
    console.log('sysvol decrease');
    res.sendStatus(501);
});


module.exports = {
    middleware: (req, res, next) => {
        res.plugins.systemvolume = 'systemvolume support';
        next();
    },
    router: router
}
