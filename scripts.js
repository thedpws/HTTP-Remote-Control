
function sendPutTo(pathname){
  if (pathname === 'play') onTrackEnd();
  console.log(pathname);
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) setCurrentTrack(xmlHttp.response);
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
