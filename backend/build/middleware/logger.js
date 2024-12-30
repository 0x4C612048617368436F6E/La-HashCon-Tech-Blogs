"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//custom logger to use
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_2 = __importDefault(require("node:fs"));
var DATABASELOGSTATUS;
(function (DATABASELOGSTATUS) {
    DATABASELOGSTATUS[DATABASELOGSTATUS["INFORMATION"] = 0] = "INFORMATION";
    DATABASELOGSTATUS[DATABASELOGSTATUS["WARNING"] = 1] = "WARNING";
    DATABASELOGSTATUS[DATABASELOGSTATUS["ERROR"] = 2] = "ERROR";
})(DATABASELOGSTATUS || (DATABASELOGSTATUS = {}));
var REPSONSESTATUSCODE;
(function (REPSONSESTATUSCODE) {
    REPSONSESTATUSCODE[REPSONSESTATUSCODE["INFORMATION"] = 0] = "INFORMATION";
    REPSONSESTATUSCODE[REPSONSESTATUSCODE["SUCCESS"] = 1] = "SUCCESS";
    REPSONSESTATUSCODE[REPSONSESTATUSCODE["REDIRECTION"] = 2] = "REDIRECTION";
    REPSONSESTATUSCODE[REPSONSESTATUSCODE["CLIENTERROR"] = 3] = "CLIENTERROR";
    REPSONSESTATUSCODE[REPSONSESTATUSCODE["SERVERERROR"] = 4] = "SERVERERROR";
})(REPSONSESTATUSCODE || (REPSONSESTATUSCODE = {}));
class Logger {
    constructor() {
        this.LogDirectory = node_path_1.default.join(__dirname, "..", "..", "Logger");
        this.LogPathServer = node_path_1.default.join(__dirname, "..", "..", "Logger", "serverlog.log");
        this.LogPathDatbase = node_path_1.default.join(__dirname, "..", "..", "Logger", "databaselog.log");
        //here just construct the date
        this.date = new Date();
        //const Cdate:string = date.toString().slice(0,-29);
    }
    logMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //check the type of status we get
            let status = res.statusCode;
            let HTTPMethod = req.method;
            let origin = req.get('host'); //i.e. from whihc origin
            let originAgain = req.hostname;
            let route = req.path;
            let HTTPVersion = req.httpVersion; //The HTTP version
            let protocol = req.protocol;
            let PORT = req.socket.localPort;
            let Device = req.device;
            let IPAddress = req.ip;
            let RESPONSESTATUS;
            if (status >= 100 && status <= 199) {
                RESPONSESTATUS = REPSONSESTATUSCODE.INFORMATION;
            }
            else if (status >= 200 && status <= 299) {
                //const LOGTAG = LOGSTATUS.INFORMATION;
                RESPONSESTATUS = REPSONSESTATUSCODE.SUCCESS;
            }
            else if (status >= 300 && status <= 399) {
                RESPONSESTATUS = REPSONSESTATUSCODE.REDIRECTION;
            }
            else if (status >= 400 && status <= 499) {
                RESPONSESTATUS = REPSONSESTATUSCODE.CLIENTERROR;
            }
            else {
                RESPONSESTATUS = REPSONSESTATUSCODE.SERVERERROR;
            }
            //construct final string
            const FinalString = origin + " " + originAgain + " " + protocol + "-- [" + this.date.toString().slice(0, 29) + "] " + "\"" + HTTPMethod + route + HTTPVersion + status + PORT + "\"-\"" + Device + IPAddress + "\n";
            //write to file
            if ((0, node_fs_1.existsSync)(this.LogDirectory)) {
                //file already exists
                //Append the message to the file
                try {
                    yield node_fs_2.default.promises.appendFile(this.LogPathServer, FinalString);
                }
                catch (err) {
                    console.log("Error occured: ", err);
                }
            }
            else {
                //file does not exists
                //make directory and create new file and write the message to it
                try {
                    node_fs_2.default.promises.mkdir(this.LogDirectory);
                    node_fs_2.default.promises.writeFile(this.LogPathServer, FinalString);
                }
                catch (err) {
                    console.log("Error occured: ", err);
                }
            }
            next();
        });
    }
    logDatabase(message) {
        return __awaiter(this, void 0, void 0, function* () {
            //Just to log Database access
            //write to file
            const FinalString = this.date + message + "\n";
            if ((0, node_fs_1.existsSync)(this.LogDirectory)) {
                try {
                    node_fs_2.default.promises.appendFile(this.LogPathDatbase, FinalString);
                }
                catch (err) {
                    console.log("Error occured: ", err);
                }
            }
            else {
                //file does not exists
                //make directory and create new file and write the message to it
                try {
                    console.log(this.LogDirectory);
                    console.log(__dirname);
                    //make directory
                    yield node_fs_2.default.promises.mkdir(this.LogDirectory);
                    yield node_fs_2.default.promises.writeFile(this.LogPathDatbase, FinalString);
                }
                catch (err) {
                    console.log("Error occured: ", err);
                }
            }
        });
    }
}
exports.default = Logger;
