"use strict";
var videoplay = document.querySelector("video#player");
let audioSource = document.querySelector("select#audioSource");
let audioOutput = document.querySelector("select#audioOutput");
let videoSource = document.querySelector("select#videoSource");

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

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia is not supported");
} else {
  var constraints = {
    video: true,
    audio: true,
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotMediaStream)
    .then(gotDevices)
    .catch(handleError);
}
