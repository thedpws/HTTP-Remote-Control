const itunes = require('./plugins/itunes.plugin/itunes');
const ppt = require('./plugins/powerpoint.plugin/powerpoint');
const sysvol = require('./plugins/systemvolume.plugin/systemvolume');
const taskswitcher = require('./plugins/taskswitcher.plugin/taskswitcher');

/* Live Services use 
 *  -iTunes
 *  -Powerpoint
 *  -System Volume
 */

module.exports = [itunes, ppt, sysvol];
