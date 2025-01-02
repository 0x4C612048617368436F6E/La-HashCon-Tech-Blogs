"use strict";
//configure cors options here
Object.defineProperty(exports, "__esModule", { value: true });
//lets define the white-lists Whihc are the allowed origins
let allowedOrigins = ["localhost"]; //Since this is a Private API, we only want our Front-end and any development frontend origin
const corsOptions = {
    origin: (origin, callback) => {
        //check if origin is not in white list
        if (allowedOrigins.includes(origin) || origin == undefined) {
            callback(null, true);
        }
        else {
            //origin does not exits
            callback(new Error("Origin is prohibited"));
        }
    }
};
exports.default = corsOptions;
