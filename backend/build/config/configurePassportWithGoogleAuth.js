"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let clientid = "";
let clientsecret = "";
if (process.env.GOOGLE_GENERATED_CLIENTID != undefined) {
    clientid = process.env.GOOGLE_GENERATED_CLIENTID;
}
if (process.env.GOOGLE_GENERATED__SECRET != undefined) {
    clientsecret = process.env.GOOGLE_GENERATED__SECRET;
}
const configurePassportWithGoogleAuth = new passport_google_oauth20_1.Strategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    //Handle authentication or creation here
    console.log(profile);
    done(null, profile);
});
exports.default = configurePassportWithGoogleAuth;
