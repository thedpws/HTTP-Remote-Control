const express = require('express');
const router = express.Router();
const itunes = require('./plugins/itunes.plugin/itunes');
const ppt = require('./plugins/powerpoint.plugin/powerpoint');
const sysvol = require('./plugins/systemvolume.plugin/systemvolume');
const taskswitcher = require('./plugins/taskswitcher.plugin/taskswitcher');

/* Live Services use 
 *  -iTunes
 *  -Powerpoint
 *  -System Volume
 *  -Task switching
 */

// Middleware for decorating response with useful plugin data
router.use(itunes.middleware);
router.use(ppt.middleware);
router.use(sysvol.middleware);
router.use(taskswitcher.middleware);

// Route requests to appropriate plugin handlers (routers)
router.use('/itunes', itunes.router);
router.use('/powerpoint', ppt.router);
router.use('/systemvolume', sysvol.router);
router.use('/taskswitcher', taskswitcher.router);


// GET to /plugins returns a set of plugin data
router.get('/plugins', (req, res) => {
    res.send(res.plugins);
});

// Catch bad routes
router.all('*', (req, res) => {
    res.send("Bad route");
});

module.exports = router;
