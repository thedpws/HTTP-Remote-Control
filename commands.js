const osascript = require('node-osascript');

const {execSync} = require('child_process');

const fs = require('fs');

const commands = JSON.parse(fs.readFileSync('commands.json', 'utf8'));


function exe(command, callback){
  console.log("\texecute: " + command);
  osascript.execute(command, (err, result, raw) => {
    console.log(result);
    getTrackInfo(callback);
  });
};

//TODO implement as pipeline
// obj = (getCurrTrack) (getCurrDuration) (getCurrPos) (obj)
function getTrackInfo(callback){
  obj = {}
  getCurrTrack(obj, callback)
};

function getCurrTrack(obj, callback){

  osascript.execute(commands.iTunes.readTrackName, (err, result, raw) => {
    //if (result.split(" ").length == 1) result = "Hymn " + result.slice(0, 3);
    obj.track = result;
    getCurrDuration(obj, callback)
  });
};

function getCurrDuration(obj, callback){
  osascript.execute(commands.iTunes.readTrackLength, (err, result, raw) => {
    obj.duration = result;
    getCurrPos(obj, callback);
  });
};

function getCurrPos(obj, callback){
  osascript.execute(commands.iTunes.readPlayerPosition, (err, result, raw) => {
    obj.position = result;
    getPlayerState(obj, callback);
  });
}

function getPlayerState(obj, callback){
  osascript.execute(commands.iTunes.readPlayerState, (err, result, raw) => {
    result = result.replace("\n", "");
    obj.playerState = result;
    getPlayerVolume(obj, callback);
  })
}

function getPlayerVolume(obj, callback){
  osascript.execute(commands.iTunes.readVolume, (err, result, raw) => {
    obj.volume = result;
    getPlayerNextTrack(obj, callback);
  })
}

function getPlayerNextTrack(obj, callback){
  osascript.execute(commands.iTunes.readNextTrack, (err, result, raw) => {
    obj.nextTrack = result;
    finish(obj,callback);
  })
}

function finish(obj, callback){
  console.log(obj);
  if (callback) callback(obj);
}


exports.decrescendo = (callback) => {
  const command = commands.iTunes.decrescendo;
  exe(command, callback);
}

//previous track
exports.prev = (callback) => {
  const command = commands.iTunes.prevTrack;
  exe(command, callback);
};

//next track
exports.next = (callback) => {
  const command = commands.iTunes.nextTrack;
  exe(command, callback);
};

exports.play = (callback) => {
  const command = commands.iTunes.play;
  exe(command, callback);
};

exports.pause = (callback) => {
  const command = commands.iTunes.pause;
  exe(command, callback);
};

exports.maxvolume = (callback) => {
  const command = commands.iTunes.maxVolume;
  exe(command, callback);
};

exports.volumeup = (callback) => {
  const command = commands.iTunes.volUp;
  exe(command, callback);
};

exports.volumedown = (callback) => {
  const command = commands.iTunes.volDown;
  exe(command, callback);
};

exports.nextslide = (callback) => {
  const command = commands.PowerPoint.nextSlide;
  exe(command, callback);
};

exports.prevslide = (callback) => {
  const command = commands.PowerPoint.prevSlide;
  exe(command, callback);
};

exports.update = (callback) => {
  let command = '\"hi\"';
  exe(command, callback);
}
