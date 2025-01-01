const signupControllerGET = (req,res)=>{
    //Now we will focus more on this later, but lets just return a status code
    const message = {
        message:"Welcome to the  SignUp Page"
        }
    res.status(200);
    res.send(message);
    
}

const signupControllerPOST = (req,res)=>{

}

module.exports = {signupControllerGET,signupControllerPOST};