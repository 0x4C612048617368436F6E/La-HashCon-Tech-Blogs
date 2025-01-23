//Create out userModel Schema here
import { timeStamp } from 'console';
import {Schema} from 'mongoose';
import mongoose from 'mongoose'

const userModel = new Schema({
    userInfo:{
        FullName:{
            type:String,
            required:true
        },
        Username:{
            type:String,
            required:true,
        },
        Email:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        },
        bio:{
            type:String,
            default:"",
            maxLength:80
        },
        profilePic:{
            type:String,
            default:"Still Thinking"
        },
        //social media
        Tiktok:{
            type:String,
            default:"",
        },
        Instagram:{
            type:String,
            default:"",
        },
        Facebook:{
            type:String,
            default:"",
        },
        GitHub:{
            type:String,
            default:"",
        },
        //account information
        totalPosts:{
            type:Number,
            default:0
        },
        totalRead:{
            type:Number,
            default:0
        },
        //auth tokens... Will be using JWT and google and Discord
        refreshToken:{
            type:String,
            default:""
        },
        timeStamps:{timestamps:true},

    }
})

//create a new model and export it
const User = mongoose.model("User",userModel);

export default User;