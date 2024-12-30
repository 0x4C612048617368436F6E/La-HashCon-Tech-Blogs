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
//Database configuration
const mongodb_1 = require("mongodb");
//import logger here to use for database
const logger_1 = __importDefault(require("../middleware/logger"));
const logger = new logger_1.default();
const databaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    //create new client instance
    const MONGODBURLSTRING = process.env.MONGODBKEY || undefined;
    if (MONGODBURLSTRING == undefined) {
        console.log("Error extracting Value");
        return;
    }
    const client = new mongodb_1.MongoClient(MONGODBURLSTRING, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        yield client.connect();
        //send a ping to confirm a successful connection
        yield client.db("admin").command({ ping: 1 });
        logger.logDatabase(" Pinged your deployment. You successfully connected to MongoDB!");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (err) {
        logger.logDatabase(err);
        console.log("Error :", err);
        //since there is an error, we want to just exit everything, i.e. terminate the server
        process.exit(-1);
    }
});
exports.default = databaseConnection;
