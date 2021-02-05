"use strict";
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices is not supported!");
} else {
  navigator.mediaDevices.enumerateDevices().then(gotDevice).catch(handleError);
}

function gotDevice(deviceInfos) {
  console.log("deviceInfos", deviceInfos);
  deviceInfos.forEach((deviceInfo) => {
    console.log(
      "kind = " +
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

function handleError(error) {
  console.log(error.name + " : " + error.message);
}
