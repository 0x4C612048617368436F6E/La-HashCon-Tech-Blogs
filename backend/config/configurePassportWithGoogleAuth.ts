import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import dotenv from 'dotenv'
dotenv.config();

let clientid :string | undefined = "";
let clientsecret :string | undefined = ""

if(process.env.GOOGLE_GENERATED_CLIENTID != undefined){
    clientid = process.env.GOOGLE_GENERATED_CLIENTID
}

if(process.env.GOOGLE_GENERATED__SECRET != undefined){
    clientsecret = process.env.GOOGLE_GENERATED__SECRET
}

const configurePassportWithGoogleAuth = new GoogleStrategy({
    clientID:clientid,
    clientSecret:clientsecret,
    callbackURL:'/auth/google/callback'
},
    (accessToken:any,refreshToken:any,profile:any,done:any) =>{
        //Handle authentication or creation here
        console.log(profile);
        done(null,profile);
    }
)

export default configurePassportWithGoogleAuth;