//import the usr model
import User from '../model/UserModel';
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

    //Note, iif user try to go to the SignupController and they are logged in, they will be redirected to the home page
    
}

const AlgorithmToCheckIfUserWithUserNameExist = ()=>{
    //now we are going to create a username that is unique for the user - TIKTOK style
    let possibleValues = ["0","1","2","3","4","5","6","7","8","9"];
    let maxmissingValueLength = 15;
    let missingRandomLength = Math.floor(Math.random()*maxmissingValueLength);
    if(missingRandomLength < 0){
        missingRandomLength = 0;
    }
    let RandomMissingValueLength = missingRandomLength; //random genrates number betwwwn 0 and 1, so multiply by missingValueLenght to get between 0 and 15
    let remaining = "";
    for(let i=0;i<RandomMissingValueLength;i++){
        let randomIndex = Math.floor(Math.random()*10);
        if(randomIndex < 0){
            randomIndex = 0;
        }
        remaining+=possibleValues[randomIndex];
    }

    return "user"+ remaining;
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

    
    //now lets check whether this username already exists
    let isUserNameAlreadyInUse = true;
    let potentialUserName = AlgorithmToCheckIfUserWithUserNameExist();
    while(isUserNameAlreadyInUse){
        let userNameIsInUse = await User.findOne({"userInfo.Username":potentialUserName})
        if(userNameIsInUse){
            //redo teh whole algorithm
            potentialUserName = AlgorithmToCheckIfUserWithUserNameExist();
        }else{
            isUserNameAlreadyInUse = false;
        }
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
            "userInfo.Username":potentialUserName,
            "userInfo.FullName":FullName,
            "userInfo.Email":Email,
            "userInfo.Password":hashedPassword
        }
        //JustMakingSureUserHasNotAlreadyRegistered
        let findDuplicateUser = await User.findOne({"userInfo.Email":Email});
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
        console.log(message);
        res.status(200);
        return res.send(message);

    }
    catch(err){
        console.log(err);
        logger.logDatabase(err);
    }
}

export {signupControllerGET,signupControllerPOST};