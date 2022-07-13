"use strict";
exports.__esModule = true;
var server_1 = require("./server");
// const log = require("logger").createLogger();
var port = process.env.PORT || 5001;
var server = (0, server_1.createServer)();
server.listen(port, function () {
    console.log("api running on http://localhost:".concat(port));
});
