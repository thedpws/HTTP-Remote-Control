const osascript = require('node-osascript');

const {execSync} = require('child_process');

const fs = require('fs');

const commands = JSON.parse(fs.readFileSync('commands/commands.json', 'utf8'));


function exe(command, callback){
  console.log("\texecute: " + command);
  osascript.execute(command, (err, result, raw) => {
    getTrackInfo(callback);
  });
};

//TODO implement as pipeline
// obj = (getCurrTrack) (getCurrDuration) (getCurrPos) (obj)
async function getTrackInfo(callback){
  obj = {
    /*
    track: await getCurrTrack(),
    duration: await getCurrDuration(),
    position: await getCurrPos(),
    playerState: await getPlayerState(),
    volume: await getPlayerVolume(),
    nextTrack: await getPlayerNextTrack(),
    */
    systemVolume: await getSystemVolume().catch(err => console.log(err))
  };
  if (callback) callback(obj);
  console.log(obj);
};


async function getCurrTrack(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.iTunes.readTrackName, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

  osascript.execute(commands.iTunes.readTrackName, (err, result, raw) => {
    //if (result.split(" ").length == 1) result = "Hymn " + result.slice(0, 3);
    return result;
  });
};

async function getCurrDuration(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands. iTunes.readTrackLength, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
  osascript.execute(commands.iTunes.readTrackLength, (err, result, raw) => {
    return result;
  });
};

async function getCurrPos(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.iTunes.readPlayerPosition, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
  osascript.execute(commands.iTunes.readPlayerPosition, (err, result, raw) => {
    return result;
  });
}

async function getPlayerState(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.iTunes.readPlayerState, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
  osascript.execute(commands.iTunes.readPlayerState, (err, result, raw) => {
    result = result.replace("\n", "");
    return result;
  });
}

async function getPlayerVolume(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.iTuens.readVolume, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    
  osascript.execute(commands.iTunes.readVolume, (err, result, raw) => {
    return result;
  });
}

async function getPlayerNextTrack(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.iTunes.readNextTrack, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
  osascript.execute(commands.iTunes.readNextTrack, (err, result, raw) => {
    return result;
  });
}

async function getSystemVolume(){
    return new Promise( (resolve, reject) => {
        osascript.execute(commands.System.readVolume, (err, result, raw) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
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

exports.sysVolUp = (callback) => {
  const command = commands.System.volUp;
  exe(command, callback);
};

exports.sysVolDown = (callback) => {
  const command = commands.System.volDown;
  exe(command, callback);
};

exports.swipeLeft = (callback) => {
    const command = commands.System.swipeLeft;
    exe(command, callback);
}

exports.swipeRight = (callback) => {
    const command = commands.System.swipeRight;
    exe(command, callback);
}
