window.onload = () => {
    // Load plugins
    let data;
    $.get('/update', x => {
        data = x;
        console.log(x);
        for (property in data){
            console.log(property);
            const string = "#" + property + '-plugin';
            console.log(string);
            $(string).show();
        }
    });

}
const formatTrackname = function (trackname) { return trackname.substring(0, 5); };

const formatStatus = status => {
	switch (status){
		case "«constant ****kPSp»": return "PAUSED";
		case "«constant ****kPSP»": return "PLAYING";
		case "«constant ****kPSS»": return "STOPPED";
		default: return status;
	}
};

const format = (propName, propValue) => {
	switch (propName){
		case 'nexttrackname':
		case 'trackname': return propValue.substring(0, 5);
		case 'playerstatus': return formatStatus(propValue);
    case 'trackduration':
    case 'trackpos': return parseFloat(propValue, 10).toFixed(2);
		default: return propValue;
		
	}
}



// FOR IR REMOTE
document.addEventListener('keydown', e => {
  console.log(e.keyCode);
  console.log(e.key);
  let path;
  switch(e.key){
    case 'F1': path = 'update'; break;
    case 'F2': path = 'system-volume/decrease'; break;
    case 'F3': path = 'powerpoint/prevslide'; break;
    case 'F4': path = 'powerpoint/nextslide'; break;
    case 'F7': path = 'itunes/prev'; break;
    case 'F8': path = 'itunes/playpause'; break;
    case 'F9': path = 'itunes/next'; break;
    case 'F10': path = 'itunes/dec'; break;
    case 'F12': path = 'system-volume/increase'; break;
  };
  if (path == undefined) console.log(`${e.key} unsupported`);
  else sendPost(`/${path}`);
});



/*
let trackpos = 0;
let trackduration = 0;

function updateInfo(trackpos, trackduration){
  trackpos = trackpos;
  trackduration = trackduration;
}
*/

/*
function updateTrackPosition(){
  trackpos += 0.2;
  if (trackpos >= trackduration) {
    $.get('/update', handleResponse)
  }
  const eTrackpos = document.getElementById('trackpos');
  const eTrackdur = document.getElementById('trackduration');

  const simpleTrackpos = trackpos.toFixed(0);
  const simpleTrackdur = trackduration.toFixed(0);

  eTrackpos.innerText = simpleTrackpos;
  eTrackdur.innerText = simpleTrackdur;
}
*/

// Each plugin is expected to return info as an object.
const cache = {};
const handleResponse = data => {
  console.log('data', data);
  for (plugin in data) for (property in data[plugin]) {
      console.log('datum', plugin, property, data[plugin][property])
      if (!cache[property]) cache[property] = document.getElementById(property);
      const e = cache[property];
      if (e) e.innerText = format(property, data[plugin][property]);
  }
}

const sendPost = path => {
    $('body').css('background-color', 'blue');
    $.post(path, response => {
        $('body').css('background-color', 'white');
        handleResponse(response);
    });
};
/*
window.onload = sendPutTo('/update');

let trackname = undefined;
let trackposition = undefined;
let trackduration = undefined;

let timeleft = undefined;

let paused = true;
pause = () => {paused = true;}
unpause = () => {paused = false;}
countDownStarted = false;

function startCountDown(){
  let minutes = Math.floor(timeleft / 60);
  let seconds = Math.round(timeleft - 60*minutes);
  if (seconds < 10) seconds = '0' + seconds;
  console.log("startCountDown!");
  countDownStarted = true;
  document.getElementById("timer").innerText = minutes + ':' + seconds;
  if (timeleft < 0) sendPutTo('/update');
  if (!paused) timeleft--;
  setTimeout(startCountDown, 1000);
}

function sendPutTo(pathname){
  console.log(pathname);
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) updateInfo(xmlHttp.response);
  }
  xmlHttp.open("PUT", pathname, true);
  xmlHttp.send();
}

function updateInfo(obj){
  console.log(obj);
  let json = JSON.parse(obj);
  trackname = json.track;
  trackposition = json.position;
  trackduration = json.duration;
  if (trackname = undefined) return;
  timeleft = Number.parseFloat(trackduration) - Number.parseFloat(trackposition);
  document.getElementById("trackname").innerText = json.track;
  document.getElementById("player-state").innerText = json.playerState[0].toUpperCase() + json.playerState.slice(1);
  document.getElementById("player-volume").innerText = "Volume: " + json.volume;
  document.getElementById("next-track").innerText = "Next track: " + json.nextTrack;
  document.getElementById("system-volume").innerText = json.systemVolume;
  if (json.playerState === "playing") paused = false;
  else paused = true;
  if (!countDownStarted) startCountDown();
}
*/
