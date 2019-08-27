/* Live Services use 
 *  -iTunes
 *  -Powerpoint
 *  -System Volume
 *  -Task switching
 */

const ppt = require('./plugins/powerpoint.plugin/powerpoint');
const sysvol = require('./plugins/systemvolume.plugin/systemvolume');
const taskswitcher = require('./plugins/taskswitcher.plugin/taskswitcher');

module.exports = [ppt, sysvol, taskswitcher]


