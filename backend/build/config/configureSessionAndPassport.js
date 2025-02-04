"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let SECRET = "";
if (process.env.HMAC_SECRET_KEY != undefined) {
    SECRET = process.env.HMAC_SECRET_KEY;
}
const configureSessionAndPassport = (0, express_session_1.default)({
    secret: SECRET,
    resave: true,
    saveUninitialized: true
});
exports.default = configureSessionAndPassport;
