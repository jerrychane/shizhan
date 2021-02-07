"use strict";
var videoplay = document.querySelector("video#player");

function gotMediaStream(stream) {
  videoplay.srcObject = stream;
}

function handleError(error) {
  console.log("getUserMedia error:", error);
}

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia is not supported");
} else {
  var constraints = {
    video: true,
    audeo: true,
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotMediaStream)
    .catch(handleError);
}
