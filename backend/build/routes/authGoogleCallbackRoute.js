"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authGoogleCallbackController_1 = __importDefault(require("../controller/authGoogleCallbackController"));
const route = express_1.default.Router();
route.get('/', authGoogleCallbackController_1.default);
exports.default = route;
