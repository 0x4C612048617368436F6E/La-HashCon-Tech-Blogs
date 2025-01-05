"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Create out userModel Schema here
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.Schema({
    userInfo: {
        FullName: {
            type: String,
            required: true
        },
        Username: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: "",
            maxLength: 80
        },
        profilePic: {
            type: String,
            default: "Still Thinking"
        },
        //social media
        Tiktok: {
            type: String,
            default: "",
        },
        Instagram: {
            type: String,
            default: "",
        },
        Facebook: {
            type: String,
            default: "",
        },
        GitHub: {
            type: String,
            default: "",
        },
        //account information
        totalPosts: {
            type: Number,
            default: 0
        },
        totalRead: {
            type: Number,
            default: 0
        },
        //auth tokens... Will be using JWT and google and Discord
        refreshToken: {
            type: String,
            default: ""
        },
    }
});
//create a new model and export it
const User = mongoose_2.default.model("User", userModel);
exports.default = User;
