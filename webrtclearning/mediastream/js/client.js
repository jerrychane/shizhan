"use strict";
var videoplay = document.querySelector("video#player");
let audioSource = document.querySelector("select#audioSource");
let audioOutput = document.querySelector("select#audioOutput");
let videoSource = document.querySelector("select#videoSource");
let filtersSelect = document.querySelector("select#filter");

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
        frameRate: 30,
        facingMode: "environment",
        deviceId,
      },
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
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
