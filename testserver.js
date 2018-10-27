const osascript = require('node-osascript');

osascript.execute("tell application \"iTunes\" to pause");

console.log(osascript.execute(""))
