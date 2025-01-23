import User from '../model/UserModel';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

type messageFormat = {
    message:string
}

const loginControllerGET = (req:any,res:any)=>{
    //Now we will focus more on this later, but lets just return a status code
    const message:messageFormat = {
        message:"Welcome to the  Login Page"
        }
    res.status(200);
    return res.send(message);
}

const loginControllerPOST = async (req:any,res:any)=>{
    //This part is going to contain a lot
    //First get the inputs from the user

    const Email:string = req.body.Email;
    const Password:string | Buffer<ArrayBufferLike>= req.body.Password;
    //Make sure these are not empty
    if(Email == "" || Email == undefined || Password == "" || Password == undefined){
        //can not have empty fields
        const message:messageFormat = {
            message:"Can not leave any fields empty"
        }
        res.status(400);
        return res.json(message);
    }
    try{
        //if above is go continue. We will check wheter the credentials are correct
        let doesUserExist:any = await User.findOne({"userInfo.Email":Email});
        //now lets check that the password entered is the same as the one stored in the dabase
        if(!doesUserExist){
            const message:messageFormat = {
                message:"Credentials entered are incorrect. Please enter your email and password"
            }
            res.status(400);
            return res.send(message);
        }
        //otherwise the credentails entereated are correct. Lets test the password
        
        let isPasswordAMatch = await bcrypt.compare(Password,doesUserExist.userInfo.Password);

        if(isPasswordAMatch){
            //password is matched, so user is authorised
            //we will create our JWT ACCESS and REFRESH tokens her
            const payload = {Email:Email};
            let ACCESS_TOKEN: string | object = "";
            let REFRESH_TOKEN: string | object = "";
            if(process.env.ACCESS_TOKEN != undefined){
                ACCESS_TOKEN = process.env.ACCESS_TOKEN;
            }

            if(process.env.REFRESH_TOKEN != undefined){
                REFRESH_TOKEN = process.env.REFRESH_TOKEN;
            }
            const JWT_ACCESS_TOKEN = JWT.sign(payload,ACCESS_TOKEN,{expiresIn:"30s"});
            //1000 = 1 milliseconds -> 30*1000 = 30 seconds
            const JWT_REFRESH_TOKEN = JWT.sign(payload,REFRESH_TOKEN,{expiresIn:"60s"});

            //we will need to first update the user  which have logged in - their refresh-token

            const update = {"userInfo.refreshToken":JWT_REFRESH_TOKEN};
            let UpdatedRefreshToken = await User.findOneAndUpdate({"userInfo.Email":Email},update);
            console.log(UpdatedRefreshToken);
            //send the access as JSON to the frontend
            res.status(200);
            res.cookie("REFRESH_TOKEN",JWT_REFRESH_TOKEN,{maxage:"60s",httpOnly:true});
            res.json({"message":"Login Successful",
                "JWT_ACCESS_TOKEN":JWT_ACCESS_TOKEN});
            //send the refreshtoek as cookie (http cookie)

        
        }else{
            //tell users password do not match
            let message:messageFormat = {
                message:"The password you entered is incorrect"
            }
            res.status(400);
            res.send(message);
        }
    }catch(err){
        console.log(err);
    }
}

export {loginControllerGET,loginControllerPOST};