"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createServer = void 0;
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var createServer = function () {
    var app = (0, express_1["default"])();
    app.use((0, cors_1["default"])());
    app.get("/", function (_req, res) {
        res.json({
            name: "Welcome to api",
            endpoints: ["/healthz", "/message/:name"]
        });
    });
    app
        .disable("x-powered-by")
        .use((0, morgan_1["default"])("dev"))
        .use((0, body_parser_1.urlencoded)({ extended: true }))
        .use((0, body_parser_1.json)())
        // .use(cors())
        .get("/message/:name", function (req, res) {
        return res.json({ message: "hello ".concat(req.params.name) });
    })
        .get("/healthz", function (_req, res) {
        return res.json({ ok: true });
    });
    return app;
};
exports.createServer = createServer;
// cspell:ignore healthz
