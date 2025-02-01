type functionDef = (req,res) => void;

const refreshTokenController:functionDef  = (req,res)=>{
    //When the access token expires, user will automatically be redirected to this route, only if the Refresh Token has
    // not expired
}

export default refreshTokenController;