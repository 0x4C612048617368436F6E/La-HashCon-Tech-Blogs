"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//custom logger to use
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
var LOGSTATUS;
(function (LOGSTATUS) {
    LOGSTATUS[LOGSTATUS["INFORMATION"] = 0] = "INFORMATION";
    LOGSTATUS[LOGSTATUS["WARNING"] = 1] = "WARNING";
    LOGSTATUS[LOGSTATUS["ERROR"] = 2] = "ERROR";
})(LOGSTATUS || (LOGSTATUS = {}));
class Logger {
    constructor() {
        this.LogPath = node_path_1.default.join(__dirname + ".." + "Logger" + "log.log");
        //here just construct the date
        this.date = new Date();
        //const Cdate:string = date.toString().slice(0,-29);
    }
    logMessage(req, res, next) {
        //check the type of status we get
        let status = req.status;
        let HTTPMethod = req.method;
        let origin = req.origin; //i.e. from whihc origin
        let route = req.path;
        let HTTPVersion = req.HTTPVersion; //The HTTP version
        let PORT = req.PORT;
        let Device = req.device;
        let IPAddress = req.IPAddress;
        if (status == 200) {
            const LOGTAG = LOGSTATUS.INFORMATION;
        }
        //construct final string
        const FinalString = origin + "-- [" + this.date.toString().slice(0, 29) + "] " + "\"" + HTTPMethod + route + HTTPVersion + status + PORT + "\"-\"" + Device + IPAddress;
        //write to file
        if ((0, node_fs_1.existsSync)(this.LogPath)) {
            //file already exists
            //Append the message to the file
        }
        else {
            //file does not exists
            //create new file and write the message to it
        }
    }
}
exports.default = Logger;
