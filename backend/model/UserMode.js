//Create out userModel Schema here
import {Schema} from 'mongodb';

const User = new Schema({
    userInfo:{
        FullName:{
            type:string,
            required:true
        },
        Email:{
            type:string,
            required:true
        },
        Password:{
            type:string,
            required:true
        },
        bio:{
            type:string,
            default:"",
            maxLength:80
        },
        profilePic:{
            type:string,
            default:"Still Thinking"
        },
        //social media
        Tiktok:{
            type:string,
            default:"",
        },
        Instagram:{
            type:string,
            default:"",
        },
        Facebook:{
            type:string,
            default:"",
        },
        GitHub:{
            type:string,
            require:"",
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
            type:string,
            default:""
        },

    }
})