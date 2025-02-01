//Here we will be using localStorage for the frontend to persists user

type funSignature = (userValue?:string|undefined) => void;
type funDignatureReturnUser = (userKey:string) => string | null

const addUser:funSignature = (user:string|undefined) =>{
    //add user to LocalStorage
    if(user == undefined){
        localStorage.setItem("user"," ");
        return;
    }

    localStorage.setItem("user",user);

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