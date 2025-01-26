import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from '../assets/Logo.png'
import searchIcon from '../assets/search-interface-symbol.png'
import { motion,AnimatePresence } from 'framer-motion';
const NavBar = ()=>{
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
				  <li className="md:px-4 md:py-2 text-black hover:border-b-solid hover:border-b-2 hover:border-black"><span>Home</span></li>
        </Link>

        <Link to="Search">
				  <li className="md:px-4 md:py-2 text-black hover:border-b-solid hover:border-b-2 hover:border-black"><span>Search</span></li>
        </Link>

        <Link to="Explore">
				  <li className="md:px-4 md:py-2 text-black hover:border-b-solid hover:border-b-2 hover:border-black"><span>Explore</span></li>
          </Link>

        <Link to="About">
				  <li className="md:px-4 md:py-2 text-black hover:border-b-solid hover:border-b-2 hover:border-black"><span>About</span></li>
          </Link>

        <Link to="Contact">
				  <li className="md:px-4 md:py-2 text-black hover:border-b-solid hover:border-b-2 hover:border-black"><span>Contact</span></li>
          </Link>
			</ul>
		</div>
		<div className="order-2 md:order-3 flex">



			  <Link to="Login">
        <button className="px-4 py-2 bg-black hover:text-black hover:bg-white text-white rounded-xl flex items-center gap-2 mr-5 duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                <span>Login</span>
            </button>
            </Link>
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