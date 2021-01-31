"use strict";
var http = require("http");
var https = require("https");
var fs = require("fs");

var express = require("express");
var serveIndex = require("serve-index");

var app = express();
app.use(serveIndex("./public"));
app.use(express.static("./public"));
// http_server
var http_server = http.createServer(app);
http_server.listen("8080", "127.0.0.1");
https_server;
var options = {
  key: fs.readFileSync("./cert/xxx.key"),
  cert: fs.readFileSync("./cert/xxx.pem"),
};
var https_server = https.createServer(options, app);
https_server.listen("443", "127.0.0.1");
