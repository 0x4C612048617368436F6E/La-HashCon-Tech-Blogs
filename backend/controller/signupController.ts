//import the usr model
import User from '../model/UserMode';
import Logger from '../middleware/logger';
import bcrypt from 'bcrypt'

const logger = new Logger();

type messageFormat = {
    message:string
}

const signupControllerGET = (req:any,res:any)=>{
    //Now we will focus more on this later, but lets just return a status code
    const message:messageFormat = {
        message:"Welcome to the  SignUp Page"
        }
    res.status(200);
    res.send(message);
    
}

const signupControllerPOST = async (req:any,res:any)=>{
    //lets pull out the stuff we need
    const FullName:string = req.body.FullName;
    const Email:string = req.body.Email;
    const Password:string | Buffer<ArrayBufferLike>= req.body.Password;

    //do some validation checks - Remeber we did this already in the frontend, so we can actually leave this out, but just for extra cautio, we will do it again
    if(FullName == "" || FullName == undefined || Email == "" || Email == undefined || Password == "" || Password == undefined){
        //can not have empty fields
        const message:messageFormat = {
            message:"Can not leave any fields empty"
        }
        res.status(400);
        return res.json(message);
    }

    //we will want to make sure that a user with the same email does not already exit. We only need to find 1 and not all of them
    //the fields we need are as follows:
    /*
    1.) FullName
    2.) Email
    3.) Password -> Make sure password is hashed and salted before putting into databse
    */
   const salt = 10;
    try{

        let hashedPassword = await bcrypt.hash(Password,salt);
        const JustMakingSureUserHasNotAlreadyRegistered = {
            "userInfo.FullName":FullName,
            "userInfo.Email":Email,
            "userInfo.Password":hashedPassword
        }
        //JustMakingSureUserHasNotAlreadyRegistered
        let findDuplicateUser = await User.findOne();
        if(findDuplicateUser){
            //So duplicate user have been found
            const message:messageFormat = {
                message:"Email already exist. Please enter a different email"
            }
            res.status(400);
            return res.json(message);
        }
        //here no diuplicate user, so create user

        let newUser = await User.create(JustMakingSureUserHasNotAlreadyRegistered);
        await newUser.save();

        //so the newUser has been created, lets just send it as json
        const message = {
            message:newUser
        }
        res.status(200);
        return res.send(message);

    }
    catch(err){
        console.log(err);
        logger.logDatabase(err);
    }
}

export {signupControllerGET,signupControllerPOST};