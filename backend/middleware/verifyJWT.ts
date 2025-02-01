import JWT from 'jsonwebtoken';

type messageFormat = {
    message:string
}

const verifyJWT = (req:any,res:any,next:any)=>{
    //Remember we are sending the ACCESS TOKEN as JSON and REFRESH TOKEN as as cookie (http cookie)

    /*
    Here what we need to do is take the ACCESS TOKEN that is being sent, and then verifyy it, beacuse as we know,
    with every request, this Token will be sent. Now the refresh token is in HTTP cookie, so we can not be
    able to access that using Javascript. But once the refresh Token expieres, we will get error if we try to access these 
    protected routes
    */

    //first get the access token
    let accessToken = req.headers['authorization'];
    console.log(accessToken);
    //Once we have that, Next we will do some checks to make
    //sure we are dealing with the right persoin
    let AuthHeaderNotRight:messageFormat = {
        message:"Unable to find Authorization"
    }

    if(!accessToken){
        res.status(401);
        return res.json(AuthHeaderNotRight);
    }
    //We have the authorization stuff... Verify

    //Format of accessToken is like:
    //Bearer Token....
    let token = accessToken.split(' ')[1];
    //Check if token is null
    let tokenIsInvalue:messageFormat = {
        message:"Token is invalid"
    }

    if(!token){
        res.status(401);
        return res.json(tokenIsInvalue);
    }

    //verify the given token
    let ACCESS_TOKEN: string | object = "";
    if(process.env.ACCESS_TOKEN != undefined){
        ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    }
    JWT.verify(token,ACCESS_TOKEN,(err:any,user:any)=>{
        if(err){
            //there have been some error
            let UnableToVerifyUser:messageFormat = {
                message:"Error with Token"
            }

            res.status(401);
            return res.send(UnableToVerifyUser);
        }
        //no errors here, so user token is valid
        req.user = user.Email;
        req.role = user.Role
        next();

    })
}