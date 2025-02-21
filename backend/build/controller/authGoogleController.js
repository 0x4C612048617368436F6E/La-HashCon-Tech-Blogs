"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const authGoogleRouteHandler = passport_1.default.authenticate('google', { scope: ['email', 'profile'] });
exports.default = authGoogleRouteHandler;
