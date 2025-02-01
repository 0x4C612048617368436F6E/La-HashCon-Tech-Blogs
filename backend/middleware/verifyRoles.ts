//Here we want to verify whether the user trying to access a 
//specific resource has the permission to do so

type messageFormat = {
    message?:string
}

const verifyRoles = (userPermission:string)=>{
    //create an IIFE (Immediately Invoked function expression)
    ((req,res,next)=>{
        let RoleNotAllowed:messageFormat = {
            message:"You do not have permission to conduct this activity"
        }
        if(req.role != userPermission){
            res.status(401);
            return res.json(RoleNotAllowed);
        }
    })
}