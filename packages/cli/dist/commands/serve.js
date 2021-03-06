"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
var path_1 = __importDefault(require("path"));
var local_api_1 = require("@jsnb/local-api");
var isProduction = process.env.NODE_ENV === "production";
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(function (filename, options) {
    if (filename === void 0) { filename = "notebook.js"; }
    try {
        var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        local_api_1.serve(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log("\n      Opened " + filename + ". Navigate to http://localhost:" + options.port + " to edit the file");
    }
    catch (error) {
        if (error.code === "EADDRINUSE") {
            console.error("Port is in use. Try running on a different port.");
        }
        else {
            console.log(error.message);
        }
        process.exit(1);
    }
});
