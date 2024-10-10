import React from 'react'
import {NavLink} from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from 'react';
import CarouselComp from './CarouselComp.jsx';
import Home from './Home.jsx';


const NavBar = () => {
    const [clicked , setclicked] = useState(false)
  return (
    <>
    <div className='w-full h-16 bg-red-600   text-white '>
       <div className='flex  justify-between items-center px-10 py-2 '>
        <h1 className='text-2xl  font-bold font-poppins '>HarborHomes</h1>
        <div className='sm:flex hidden justify-between items-center w-fit gap-6 f-fit '>
            <div className='w-fit h-fit py-2 px-2  hover:border-b-2 hover:transition-all hover:border-white'>
            <NavLink to='/home' className='text-lg font-medium font-roboto '>Home</NavLink>
            </div>
            <div className='w-fit h-fit py-2 px-2  hover:border-b-2 hover:transition-all hover:border-white'>
            <NavLink to='/SignUp'  className='text-lg font-medium font-roboto '>SignUp</NavLink>
            </div>
          <div className='w-fit h-fit py-2 px-2  hover:border-b-2 hover:transition-all hover:border-white'>
          <NavLink to='/Login' className='text-lg font-medium  font-roboto'>Login</NavLink>
          </div>
          <div className='w-fit h-fit py-2 px-2  hover:border-b-2 hover:transition-all hover:border-white'>
          <NavLink to='/AdminLogin' className='text-lg font-medium font-roboto '>Admin Login</NavLink>
          </div>
        </div>
          <RiMenu3Fill className='text-xl sm:hidden h-fit w-fit cursor-pointer  block font-medium text-white' onClick={()=>setclicked(prev=>!prev)} title='Menu'/>
       </div>
       
      { clicked && <div className={`w-full h-fit sm:hidden mt-2`}>
           <div>
           <div className='sm:hidden  h-fit py-2 px-2 border-b border-gray-400 w-full  text-center hover:bg-gray-200 '>
            <NavLink to='/home' className='text-lg font-normal tracking-wider font-roboto text-black hover:text-red-500 transition-all'>Home</NavLink>
            </div>
            <div className=' h-fit py-2 px-2 border-b border-gray-400 w-full   text-center hover:bg-gray-200 '>
            <NavLink to='/SignUp' className='text-lg font-normal tracking-wider font-roboto text-black hover:text-red-500 transition-all'>SignUp</NavLink>
            </div>
            <div className=' h-fit py-2 px-2 border-b border-gray-400 w-full  text-black text-center hover:bg-gray-200  '>
            <NavLink to='/Login' className='text-lg font-normal tracking-wider font-roboto hover:text-red-500 transition-all'>Login</NavLink>
            </div>
            <div className=' h-fit py-2 px-2 border-b border-gray-400 w-full  text-black  text-center hover:bg-gray-200 '>
            <NavLink to='/AdminLogin' className='text-lg font-normal tracking-wider font-roboto hover:text-red-500 transition-all'>AdminLogin</NavLink>
            </div>
           </div>
        </div>}
    </div>
    <CarouselComp />
    <Home/>

    </>
  )
}

export default NavBar