

function updateCurrentTrack(){
  console.log("updateCurrentTrack()");
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/next', true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            let result = xmlHttp.response;
            setCurrentTrack(result);
            console.log(xmlHttp.response);
        }
    };
    xmlHttp.send();
}

function sendPutTo(pathname){
  console.log(pathname);
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4) setCurrentTrack(xmlHttp.response);
  }
  xmlHttp.open("PUT", pathname, true);
  xmlHttp.send();

  /*
  if (pathname === '/next' || pathname === '/prev'){
      let prevname = getCurrentTrack();
      setCurrentTrack("Waiting...");
      while (getCurrentTrack() === prevname || getCurrentTrack() === "Waiting..."){
          updateCurrentTrack();
      }
  }
  */
}

function setCurrentTrack(name){
    document.getElementById("currentTrack").innerText = name;
}

function getCurrentTrack(){
    return document.getElementById("currentTrack").innerText;
}
