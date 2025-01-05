const verifyJWT = (req:any,res:any,next:any)=>{
    //Remember we are sending the ACCESS TOKEN as JSON and REFRESH TOKEN as as cookie (http cookie)

    /*
    Here what we need to do is take the ACCESS TOKEN that is being sent, and then verifyy it, beacuse as we know,
    with every request, this Token will be sent. Now the refresh token is in HTTP cookie, so we can not be
    able to access that using Javascript. But once the refresh Token expieres, we will get error if we try to access these 
    protected routes
    */

    //first get the access token
    let accessToken = req.headers.authorization;
    console.log(accessToken);
}