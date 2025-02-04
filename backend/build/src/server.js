"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../middleware/logger"));
const express_1 = __importDefault(require("express"));
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const corsOptionConfig_1 = __importDefault(require("../config/corsOptionConfig"));
const homeRoute_1 = __importDefault(require("../routes/homeRoute"));
const signupRoute_1 = __importDefault(require("../routes/signupRoute"));
const loginRoute_1 = __importDefault(require("../routes/loginRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//import homeRoute from '../routes/homeRoute';
const passport_1 = __importDefault(require("passport"));
const configurePassportWithGoogleAuth_1 = __importDefault(require("../config/configurePassportWithGoogleAuth"));
const configureSessionAndPassport_1 = __importDefault(require("../config/configureSessionAndPassport"));
const authGoogleRoute_1 = __importDefault(require("../routes/authGoogleRoute"));
require('dotenv').config();
const authGoogleCallbackRoute_1 = __importDefault(require("../routes/authGoogleCallbackRoute"));
let app = (0, express_1.default)();
let PORT = process.env.PORT || 5000;
(0, databaseConfig_1.default)();
//do som configuration
passport_1.default.use(configurePassportWithGoogleAuth_1.default);
app.use(configureSessionAndPassport_1.default);
//initialise passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//set up the middleware
app.use((0, cors_1.default)(corsOptionConfig_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const logger = new logger_1.default();
app.use(logger.logMessage);
app.use('/', homeRoute_1.default);
app.use('/signup', signupRoute_1.default);
app.use('/login', loginRoute_1.default);
app.use('/auth/google', authGoogleRoute_1.default);
app.use('/auth/google/callback', authGoogleCallbackRoute_1.default);
app.use(logger.logError);
//want to connect to database and then connect to server. If connection to databsae failes, no to concect to server
mongoose_1.default.connection.on('connecting', () => {
    console.log('connecting');
    console.log(mongoose_1.default.connection.readyState);
    logger.logDatabase("Trying to connect to database... Please Wait");
    logger.logDatabase("Ready State " + mongoose_1.default.connection.readyState + "\n");
});
mongoose_1.default.connection.on('connected', () => {
    console.log('connected');
    console.log(mongoose_1.default.connection.readyState);
    logger.logDatabase("Connected to Database");
    logger.logDatabase("Ready State " + mongoose_1.default.connection.readyState);
    //make server listen here
    app.listen(PORT, () => {
        console.log("Server is listening at port " + PORT);
        logger.logMessageForServer("Server is listening at port " + PORT);
    });
});
mongoose_1.default.connection.on('disconnecting', () => {
    console.log('disconnecting');
    console.log(mongoose_1.default.connection.readyState);
    logger.logDatabase("Disconnecting to database... Please Wait");
    logger.logDatabase("Ready State " + mongoose_1.default.connection.readyState);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('disconnected');
    console.log(mongoose_1.default.connection.readyState);
    logger.logDatabase("Database connection disconected");
    logger.logDatabase("Ready State " + mongoose_1.default.connection.readyState + "\n");
});
//Checking
