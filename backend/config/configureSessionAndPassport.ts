import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config();

let SECRET: string | undefined = "";

if(process.env.HMAC_SECRET_KEY != undefined){
    SECRET = process.env.HMAC_SECRET_KEY
}

const configureSessionAndPassport = session({
    secret:SECRET,
    resave:true,
    saveUninitialized:true
})

export default configureSessionAndPassport;