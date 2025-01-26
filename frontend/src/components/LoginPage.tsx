import Logo from '../assets/Logo.png';
import Google from '../assets/google.png';
import Github from '../assets/github.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer,toast, Zoom } from 'react-toastify';
import axios from 'axios';
import visible from '../assets/visible.png';
import invisible from '../assets/hidden.png';

const LoginPage = ()=>{

    type functionDef = (e?:any) => void;
    type voidPromise = (dataToSend?:any) => Promise<void>;
    type userData = {
        Email:string,
        Password:string
    }

    enum BackendResponse {
        CREDENTIALINCORRECT = 400,
        USERLOGGEDIN = 200
    }

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [isEmailLeftBlank,setIsEmailLeftBlank] = useState(false);
    const [isPasswordLeftBlank,setIsPasswordLeftBlank] = useState(false);

    const [EmailIsNotValid,setEmailIsNotValid] = useState(false);

    const [PasswordIsNotValid,setPasswordIsNotValid] = useState(false);
    const [seePassword,setSeePassword] = useState(false);

    let [userLoggedInSuccessfully,setUserLoggedInSuccessfully] = useState(false);

    const FieldLeftBlank:functionDef = () =>{
        toast.warn("Field can not be left blank",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,})
    }

    const handleLoginPageSubmit:functionDef = (e:any)=>{
        e.preventDefault();

        console.log(Email);
        console.log(Password);
        if(Email === "" || Email === undefined){
            setIsEmailLeftBlank(()=>true);
            FieldLeftBlank();
        }
        else{
            setIsEmailLeftBlank(()=>false);
        }

        if(Password === "" || Password === undefined){
            setIsPasswordLeftBlank(()=>true);
            FieldLeftBlank();
        }else{
            setIsPasswordLeftBlank(()=>false);
        }

        const UserLoginSuccessfully:functionDef = () =>{
                    toast.success("User Logged in successfully",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                        })
                        setUserLoggedInSuccessfully(()=>true);
                }

                const UserLoginUnSuccessfully:functionDef = () =>{
                    toast.success("Incorrect credentials",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                        })
                        setUserLoggedInSuccessfully(()=>true);
                }


        const sendUserInformationToTheBackEnd:voidPromise = async (dataToSend:any) =>{
                //we will use axios to simplify things
                try{
                    let userLogin = await axios.post("http://localhost:5000/Login",dataToSend);
                    //UserLoginSuccessfully();
                    console.log(userLogin.status);
                    if(userLogin.status == BackendResponse.CREDENTIALINCORRECT){
                        UserLoginUnSuccessfully()
                        return;
                    }
                    if(userLogin.status == BackendResponse.USERLOGGEDIN){
                        UserLoginSuccessfully();
                        //take user to Next Page
                    }
                }catch(err){
                    console.log(err);
                }
            }

        const EmailIsNotValid:functionDef = ()=>{
                toast.warn("Email is not valid",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Zoom,
                        })
                }

                const EmailIsValid = ():void =>{
                            toast.info("Email is valid",{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Zoom,
                                })
                        }
                        
            const PasswordMustContain8CharacterECT:functionDef = ()=>{
                        toast.warn("Password must contain a minimum of 8 characters, at least one uppercase English letter, at least one lowercase English letter, at least one digit,and at least one special character",{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Zoom,
                            })
                    }

            //we will pre-process all the inputs that we got from the user
            setEmail(()=>Email.trim());
            setPassword(()=>Password.trim());
            //lets work on the email
        let EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if(!EmailRegex.test(Email)){
            //email is invalid
            console.log("Email is not valid");
            setEmailIsNotValid(()=>true);
            EmailIsNotValid();
            return;
        }
        else{
            console.log("Email is valid");
            setEmailIsNotValid(()=>false);
            EmailIsValid();
        }
        //console.log(`Email: ${FullName}`);

        //lets work on password
        /*let PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if(!PasswordRegex.test(Password)){
            //here password does not abide by rules
            console.log("Password must contain a minimum of 8 characters, at least one uppercase English letter, at least one lowercase English letter, at least one digit,and at least one special character");
            setPasswordIsNotValid(()=>true);
            PasswordMustContain8CharacterECT();
            return;
        }else{
            console.log("Password is accepted");
            setPasswordIsNotValid(()=>false);
        }
        //console.log(`Password: ${FullName}`);*/
            let dataToSend:userData = {
                Email:Email,
                Password:Password
            }
        sendUserInformationToTheBackEnd(dataToSend);
    }

    const showPassword:functionDef = ()=>{
        //when OnClick is activated, we show/unshow the password
        console.log("Show/Unshow Password");
        setSeePassword((prev)=>!prev);
    }

    return(
        <>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <ToastContainer />
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">
                        Login In
                    </h1>
                    <div className="w-full flex-1 mt-8">
                        <div className="flex flex-col items-center">
                            <button
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <div className="p-2 rounded-full">
                                    <img src={Google} className='w-5'/>
                                </div>
                                <span className="ml-4">
                                    Log In with Google
                                </span>
                            </button>
    
                            <button
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                <div className="p-1 rounded-full">
                                    <img src={Github} className='w-5'/>
                                </div>
                                <span className="ml-4">
                                    Log In with GitHub
                                </span>
                            </button>
                        </div>
    
                        <div className="my-12 border-b text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Or Log In with e-mail
                            </div>
                        </div>
    
                        <form className="mx-auto max-w-xs" onSubmit={(e)=>{handleLoginPageSubmit(e)}}>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email" placeholder="Email" value={Email} onChange={(e)=>{setEmail(()=>e.target.value)}}/>
                                {isEmailLeftBlank && <p className='text-red-600'>Field can not be left empty</p> || EmailIsNotValid && <p className='text-red-600'>Email is not Valid</p> || <p></p>}
                        <div className='relative'>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type={seePassword ? "text" : "password"} placeholder="Password" value={Password} onChange={(e)=>{setPassword(()=>e.target.value)}}/>
                                <img src={seePassword ? visible : invisible} className='w-5 absolute right-5 top-10 cursor-pointer' onClick={()=>showPassword()}/>                                
                                {isPasswordLeftBlank && <p className='text-red-600'>Field can not be left empty</p> || <p></p>}
                        </div>
                            <button
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-black hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                
                                <span className="ml-3">
                                    Log In
                                </span>
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                No account?
                                    <Link to="/Signup" className="border-b border-gray-500 border-dotted ml-2">SignUp</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-white text-center hidden lg:flex">
                <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default LoginPage;