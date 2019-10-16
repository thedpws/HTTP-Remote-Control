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
let trackpos = 0;
let trackduration = 0;

function updateInfo(trackpos, trackduration){
  trackpos = trackpos;
  trackduration = trackduration;
}

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

// Each plugin is expected to return info as an object.
const handleResponse = data => {
  console.log(data);
  for (plugin in data) {
    for (property in data[plugin]) {
      const e = document.getElementById(property);
      if (e) e.innerText = data[plugin][property];
    }
  }
  //updateInfo(data['itunes']['trackpos'], data['itunes']['trackduration']);
}


const sendPost = path => {
    $('body').css('background-color', 'red');
    $.post(path, response => {
        handleResponse(response);
        $('body').css('background-color', 'white');
    });
}
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
