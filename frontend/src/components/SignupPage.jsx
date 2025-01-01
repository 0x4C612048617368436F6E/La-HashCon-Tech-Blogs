import Video from '../assets/204565-924698132_small.mp4';
import Google from '../assets/google.png';
import Github from '../assets/github.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import visible from '../assets/visible.png';
import invisible from '../assets/hidden.png';

const SignupPage = () =>{
    let [IsFullNameLeftBlank,setIsFullNameLeftBlank] = useState(false);
    let [IsEmailLeftBlank,setIsEmailLeftBlank] = useState(false);
    let [IsPasswordLeftBlank,setIsPasswordLeftBlank] = useState(false);

    let [FullName,setFullName] = useState(''); //for FullName input
    let [EnterFirstNameAndLastNameOnly,setEnterFirstNameAndLastNameOnly] = useState(false);
    let [FullNameIsNotInRightFormat,setFullNameIsNotInRightFormat] = useState(false);

    let [Email,setEmail] = useState(''); //for Email input
    let [EmailIsNotValid,setEmailIsNotValid] = useState(false);

    let [Password,setPassword] = useState(''); //for Password input
    let [PasswordIsNotValid,setPasswordIsNotValid] = useState('');
    let [seePassword,setSeePassword] = useState(false);

    const handleSignUpPageSubmit = (e)=>{
        e.preventDefault();

        //lets check that we have all inputs (We do not really need this, but just to have a solid barrier)
        if(FullName === undefined || FullName ===""){
            setIsFullNameLeftBlank(()=>true);
        }else{
            setIsFullNameLeftBlank(()=>false);
        } 
        
        if(Email === undefined || Email === ""){
            setIsEmailLeftBlank(()=>true);
        }else{
            setIsEmailLeftBlank(()=>false);
        }
        
        if(Password === undefined || Password === ""){
            setIsPasswordLeftBlank(()=>true);
        }else{
            setIsPasswordLeftBlank(()=>false);
        }

        //lets trim all input before passing them
        FullName = FullName.trim();
        Email = Email.trim();
        Password = Password.trim()
        //check that the FullName contains the right format, use regex
        //console.log(`FullName: ${FullName}`);
        let FullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if(!FullNameRegex.test(FullName)){
            //lets check soome condition
            let EnteredFullName = (FullName.trim()).split(' ');
            //Check that the length of EnteredFullName is no more than 2
            if(EnteredFullName.length !== 2){
                //Tell users that the length of FullName must be 2
                setEnterFirstNameAndLastNameOnly(()=>true)
                console.log("Please enter you First and Last name only")
                return;
            }else{
                setEnterFirstNameAndLastNameOnly(()=>false);
            }
            setFullNameIsNotInRightFormat(()=>true);
            console.log("FullName is not of Right Format. Only letters are allowed");
            return;
        }else{
            //User name are in the  right Format
            setFullNameIsNotInRightFormat(()=>false);
            console.log("FullName is of Right Format");
        }

        //lets work on the email
        let EmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if(!EmailRegex.test(Email)){
            //email is invalid
            console.log("Email is not valid");
            setEmailIsNotValid(()=>true);
            return;
        }
        else{
            console.log("Email is valid");
            setEmailIsNotValid(()=>false);
        }
        //console.log(`Email: ${FullName}`);

        //lets work on password
        let PasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if(!PasswordRegex.test(Password)){
            //here password does not abide by rules
            console.log("Password must contain a minimum of 8 characters, at least one uppercase English letter, at least one lowercase English letter, at least one digit,and at least one special character");
            setPasswordIsNotValid(()=>true);
            return;
        }else{
            console.log("Password is accepted");
            setPasswordIsNotValid(()=>false);
        }
        //console.log(`Password: ${FullName}`);
    }

    const showPassword = ()=>{
        //when OnClick is activated, we show/unshow the password
        console.log("Show/Unshow Password");
        setSeePassword((prev)=>!prev);
    }

    return(
<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center">
                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="p-2 rounded-full">
                                <img src={Google} className='w-5'/>
                            </div>
                            <span className="ml-4">
                                Sign Up with Google
                            </span>
                        </button>

                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                            <div className="p-1 rounded-full">
                                <img src={Github} className='w-5'/>
                            </div>
                            <span className="ml-4">
                                Sign Up with GitHub
                            </span>
                        </button>


                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                            <div className="p-1 rounded-full">
                                <img src={Github} className='w-5'/>
                            </div>
                            <span className="ml-4">
                                Sign Up with Discord
                            </span>
                        </button>
                    </div>

                    <div className="my-12 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>

                    <form className="mx-auto max-w-xs" onSubmit={(e)=>{handleSignUpPageSubmit(e)}}>
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="text" placeholder="FullName" value={FullName} onChange={(e)=>{setFullName(()=>e.target.value)}}/>
                            {IsFullNameLeftBlank && <p className='text-red-600'>Field can not be left empty</p> || EnterFirstNameAndLastNameOnly && <p className='text-red-600'>Please enter you First and Last name only</p> || FullNameIsNotInRightFormat && <p className='text-red-600'>FullName is not of Right Format. Only letters are allowed</p> || <p></p>}
                        <input
                            className="w-full px-8 py-4 mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" value={Email} onChange={(e)=>{setEmail(()=>e.target.value)}}/>
                            {IsEmailLeftBlank && <p className='text-red-600'>Field can not be left empty</p> || EmailIsNotValid && <p className='text-red-600'>Email is not Valid</p> || <p></p>}
                        <div className='relative'>
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type={seePassword ? "text" : "password"} placeholder="Password" value={Password} onChange={(e)=>{setPassword(()=>e.target.value)}}/>
                            <img src={seePassword ? visible : invisible} className='w-5 absolute right-5 top-10 cursor-pointer' onClick={()=>showPassword()}/>
                        </div>
                            {IsPasswordLeftBlank && <p className='text-red-600'>Field can not be left empty</p> || PasswordIsNotValid && <p classNameA='text-red-600'>Password must contain a minimum of 8 characters, at least one uppercase English letter, at least one lowercase English letter, at least one digit,and at least one special character</p> || <p></p>}

                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-black hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                            <span className="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Have an account?
                            <Link to="/Login" className="border-b border-gray-500 border-dotted ml-2">
                                Login
                                </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-white text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                <video autoPlay muted loop className='w-full h-full'>
                    <source src={Video} type="video/mp4"/>
                </video>
            </div>
        </div>
    </div>
</div>
    )
}

export default SignupPage;