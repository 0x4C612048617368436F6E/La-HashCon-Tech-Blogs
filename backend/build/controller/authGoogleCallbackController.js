"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const authGoogleCallbackRouteHandler = passport_1.default.authenticate('google', {
    successRedirect: '/auth/google/callback',
    failureRedirect: '/auth/google/failure'
});
exports.default = authGoogleCallbackRouteHandler;
