"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../middleware/logger"));
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
require('dotenv').config();
let app = (0, express_1.default)();
let PORT = process.env.PORT || 5000;
(0, databaseConfig_1.default)();
//set up the middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const logger = new logger_1.default();
app.use(logger.logMessage);
app.listen(PORT, () => {
    console.log("Server is listening at port " + PORT);
});
