//Here we will be using localStorage for the frontend to persists user

type funSignature = (userValue?:string|undefined) => void;
type funDignatureReturnUser = (userKey:string) => string | null
type userInformation = {
    FirstName?:string | null,
    LastName?:string | null,
    UserName?:string | null,
    Email?:string | null,
    Role?:string,
}


const addUser:funSignature = (user:userInformation|string|undefined) =>{
    //add user to LocalStorage
    if(user == undefined){
        localStorage.setItem("user"," ");
        return;
    }
    localStorage.setItem("user",user.toString());

}

const getUser:funDignatureReturnUser = (userKey:string) =>{
    //get user from localStorage
    return localStorage.getItem(userKey);
}

const deleteUser:funSignature = (userKey) =>{
    //delete user from localStorage

    //clear looks more suitable compared to removeItem
    localStorage.clear()
}

export {addUser, getUser, deleteUser};