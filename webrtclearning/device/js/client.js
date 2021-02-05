"use strict";
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices is not supported!");
} else {
  navigator.mediaDevices.enumerateDevices().then(gotDevice).catch(handleError);
}

function gotDevice(deviceInfos) {
  deviceInfos.forEach((deviceInfo) => {
    console.log(
      deviceInfo.kind +
        ":lable = " +
        deviceInfo.label +
        ":id = " +
        deviceInfo.deviceId +
        ":groupId = " +
        deviceInfo.groupId
    );
  });
}

function handleError(error) {}
