const {execSync} = require('child_process');

const exe = (command, callback) => {
  // stderr is sent to stdout of parent process
  // you can set options.stdio if you want it to go elsewhere
  console.log("\texecute: " + command);
  execSync(command);
  getCurrTrack(callback);
};

getTrackInfo = callback => {
  let obj = getCurrTrack
}

getCurrTrack = callback => {
  const spawn = require('child_process').spawn;
  const child = spawn('./scripts/currtrack.sh');
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', data => {
    if (callback) callback(data);
    console.log(data);
  });

};

exports.decrescendo = (callback) => {
  var vol = 10;
  let command = "./scripts/decrescendo.sh";
  exe(command);
  exports.maxvolume();
  exports.next(callback);
}

//previous track
exports.prev = (callback) => {
  let command = "./scripts/prevtrack.sh";
  exe(command, callback);
};

//next track
exports.next = (callback) => {
  let command = "sudo osascript -e \'tell application \"iTunes\" to next track\'";
  exe(command, callback);
};

exports.play = (callback) => {
  let command = "sudo osascript -e \'tell application \"iTunes\" to play\'";
  exe(command, callback);
};

exports.pause = (callback) => {
  let command = "sudo osascript -e \'tell application \"iTunes\" to pause\'";
  exe(command, callback);
};

exports.maxvolume = (callback) => {
  //let command = "sudo osascript -e \"set Volume 10\"";
  let command = "sudo osascript -e \'tell app \"iTunes\" to set the sound volume to 100\'";
  exe(command, callback);
};

exports.volumeup = (callback) => {
  let command = "sudo osascript -e \'tell application \"iTunes\" to set the sound volume to (the sound volume + 10)\'";
  exe(command, callback);
};

exports.volumedown = (callback) => {
  let command = "sudo osascript -e \'tell application \"iTunes\" to set the sound volume to (the sound volume - 10)\'";
  exe(command, callback);
};

exports.nextslide = (callback) => {
  let command = 'sudo ./scripts/nextslide.sh';
  exe(command, callback);
};

exports.prevslide = (callback) => {
  let command = 'sudo ./scripts/prevslide.sh';
  exe(command, callback);
};

exports.sysVol = (level, callback) => {
  let command = 'sudo osascript -e \'tell application \"System Events\" set'
};
