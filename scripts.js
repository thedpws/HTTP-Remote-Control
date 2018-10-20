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
  document.getElementById("timeleft").innerText = minutes + ':' + seconds;
  if (timeleft < 0) sendPutTo('/update')
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

function setCurrentTrack(name){
    document.getElementById("currentTrack").innerText = name;
}

function getCurrentTrack(){
    return document.getElementById("currentTrack").innerText;
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
  document.getElementById("trackposition").innerText = json.position;
  document.getElementById("trackduration").innerText = json.duration;
  if (!countDownStarted) startCountDown();
}
