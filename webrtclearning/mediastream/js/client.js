"use strict";
var videoplay = document.querySelector("video#player");
var audioplay = document.querySelector("audio#audioplayer");
let audioSource = document.querySelector("select#audioSource");
let audioOutput = document.querySelector("select#audioOutput");
let videoSource = document.querySelector("select#videoSource");
let filtersSelect = document.querySelector("select#filter");
let snapshot = document.querySelector("button#snapshot");
let picture = document.querySelector("canvas#picture");
let divConstraints = document.querySelector("div#constraints");  
  
picture.width = 640;
picture.height = 320;

function gotDevices(deviceInfos) {
  deviceInfos.forEach((deviceInfo) => {
    let option = document.createElement("option");
    option.text = deviceInfo.label;
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "audioinput") {
      audioSource.appendChild(option);
    } else if (deviceInfo.kind === "audiooutput") {
      audioOutput.appendChild(option);
    } else if (deviceInfo.kind === "videoinput") {
      videoSource.appendChild(option);
    }
  });
}

function gotMediaStream(stream) {
  videoplay.srcObject = stream;
  // audioplay.srcObject = stream;
  let videoTrack = stream.getVideoTracks()[0]
  let videoContraints = videoTrack.getSettings()
  divConstraints.textContent = JSON.stringify(videoContraints,null,2)

  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log("getUserMedia error:", error);
}
function start() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia is not supported");
    return;
  } else {
    var deviceId = videoSource.value;
    var constraints = {
      video: {
        width: 640,
        height: 320,
        frameRate: 15,
        facingMode: "environment",
        deviceId,
      },
      // video: true,
      audio: false,
      // audio: {
      //   noiseSuppression: false,
      //   echoCancellation: false,
      // },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotMediaStream)
      .then(gotDevices)
      .catch(handleError);
  }
}
start();
videoSource.onchange = start;
filtersSelect.onchange = function () {
  videoplay.className = filtersSelect.value;
};

snapshot.onclick = function () {
  picture.className = filtersSelect.value;
  picture
    .getContext("2d")
    .drawImage(videoplay, 0, 0, picture.width, picture.height);
};
