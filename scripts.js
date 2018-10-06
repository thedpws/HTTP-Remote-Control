

function updateCurrentTrack(){
  console.log("updateCurrentTrack()");
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/next', true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            let result = xmlHttp.response;
            document.getElementById("currentTrack").innerText = result;
            console.log(xmlHttp.response);
        }
    }
    xmlHttp.send();
}

function sendPutTo(pathname){
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("PUT", pathname, true);
  xmlHttp.send();
}
