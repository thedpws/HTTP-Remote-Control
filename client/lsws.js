window.onload = sendPutTo('/update');

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
  document.getElementById("system-volume").innerText = json.systemVolume;
}
