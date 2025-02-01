"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
/*
Will also include roles, such as:
1.) User - Default - Can View Posts only
2.) Editor - Editors can add blogs
3.) Admin - Should be Only Me. I can Delete Users, Post (if not positive), and much more

Lets make some adjustments
User Will only have the role of a user

Editor will have the role of a User and the role of an Editor

Admin will have the role of a User, Editor and an Admin
*/
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
        userRole: {
            type: String,
            default: "User"
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
        timeStamps: {
            type: Date,
            default: new Date()
        },
    }
});
//create a new model and export it
const User = mongoose_2.default.model("User", userModel);
exports.default = User;
