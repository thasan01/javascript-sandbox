const glMatrix = require("gl-matrix");
const { asynctask } = require("./asynctask");
const { renderer } = require("./renderer");
const Constants = require("./data/constants");
const jQuery = require("jquery");

exports.libs = { glMatrix, jQuery };
exports.modules = {
  Renderer: renderer,
  AsyncTask: asynctask,
  Constants,
};
exports.params = { serverUrl: "http:localhost:8080/resources" };
