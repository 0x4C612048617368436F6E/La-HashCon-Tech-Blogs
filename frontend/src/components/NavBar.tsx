import React from "react";
import { Link, Outlet,useLocation} from "react-router-dom";
import logo from '../assets/Logo.png'
import searchIcon from '../assets/search-interface-symbol.png'
import { motion,AnimatePresence } from 'framer-motion';
const NavBar = ()=>{
  const location = useLocation();
  const lowerCaseLogin = "/login";
  const upperCaseLogin = "/Login";
  const lowerCaseSignUp = "/signup";
  const uppercaseSignUp = "/Signup";

    return(
        <>
         <AnimatePresence>
        <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ duration: 1, delay: 0.5 }}
>
        <nav className="bg-white shadow shadow-gray-300 w-100 px-8 md:px-auto fixed w-full">
	<div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
    <Link to="/">
		<div className="text-black md:order-1 flex">
      <h1 className="ml-5 mt-1 text-2xl font-extrabold">La HashCon</h1>
		</div>
    </Link>
		<div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul className="flex font-semibold justify-between">
        <Link to="/">
				  <li className="mx-4 text-black"><span className="text-lg">Home</span></li>
        </Link>

        <Link to="Search">
				  <li className="mx-4 text-black"><span className="text-lg">Search</span></li>
        </Link>

        <Link to="Explore">
				  <li className="mx-4 text-black"><span className="text-lg">Explore</span></li>
          </Link>

        <Link to="About">
				  <li className="mx-4 text-black"><span className="text-lg">About</span></li>
          </Link>

        <Link to="Contact">
				  <li className="mx-4 text-black"><span className="text-lg">Contact</span></li>
          </Link>
			</ul>
		</div>
		<div className="order-2 md:order-3 flex">


      {/*What we want to do is make is such that if User are on /Login route they will be routed to signup and if on signUp routed to Login
      
      IK beloe code is highly inefficient, but whatever works, then we leave
      */}
			  {location.pathname == lowerCaseLogin || location.pathname == upperCaseLogin ? <Link to="Signup">
        <button className="px-4 py-2 bg-black hover:text-black hover:bg-white text-white rounded-xl flex items-center gap-2 mr-5 duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <span>{(location.pathname == lowerCaseLogin || location.pathname == upperCaseLogin ? "Signup" : location.pathname == lowerCaseSignUp || location.pathname == uppercaseSignUp ? "Login" : "Login")}</span>
            </button>
            </Link> : <Link to="Login">
        <button className="px-4 py-2 bg-black hover:text-black hover:bg-white text-white rounded-xl flex items-center gap-2 mr-5 duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <span>{(location.pathname == lowerCaseLogin || location.pathname == upperCaseLogin ? "Signup" : location.pathname == lowerCaseSignUp || location.pathname == uppercaseSignUp ? "Login" : "Login")}</span>
            </button>
            </Link>}
		</div>
	</div>
</nav>
<Outlet />
</motion.div>
</AnimatePresence>
        
        </>
        
    )
}

export default NavBar;