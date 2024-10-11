import React, { useState } from 'react'
import { TiUpload } from "react-icons/ti";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
    const [Image,setImage]=useState(null);
     
    const handleSubmit = (e)=>{
         e.preventDefault();
         console.log(e)
         const formData = new FormData();
         formData.append('Image' , Image)
         formData.append('UserName' ,e.target[1].value );
         formData.append('Email' , e.target[2].value);
         formData.append('Password',e.target[3].value);
         console.log(Image)
         try {
            axios.post('http://localhost:8000/api/v1/users/registerUser' ,formData)
            .then((response)=>{
                toast.success('User Registered Successfully')
                console.log(response)})
            .catch((error)=>{
                toast.error('Error Occured During Registration')
                console.log(error)})
         } catch (error) {
            console.log(error.message)
         }
    }


  return (
  <>
    <div className='w-full h-screen overflow-auto bg-gray-100'>
    <div className='w-full h-18 bg-red-600 px-10 py-6 flex justify-between items-center'>
        <h1 className='text-xl font-poppins font-bold text-white '>HARBORHOMES</h1>
        <div className='hover:border-b border-white px-3 '>
            <NavLink className='text-xl text-white font-roboto font-medium ' to='/' >Home</NavLink>
        </div>
    </div>
    <div className='w-full h-fit flex flex-col justify-center items-center'>
       
        <form onSubmit={handleSubmit} encType='multipart/form-data'  className='flex flex-col justify-center items-center gap-6 w-fit h-fit  px-8 py-6 border-gray-200 border rounded-lg bg-white my-10'>
        <h1 className='text-3xl text-red-600 font-bold font-poppins'>SignUp</h1> 
            <div className='relative'>
                <div className='w-[150px] h-[150px] rounded-full overflow-hidden flex justify-center items-center cursor-pointer border-2 border-[#dddd] '>
                    {
                      Image ? (
                        <img src={Image} alt="Profile" className='w-full h-full object-cover' />
                      ):(<span >Upload Picture</span>)
                    }
                </div>
                <label className="absolute bottom-2 right-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>{
                console.log(e)
                setImage(e.target.files[0])}}
            className="hidden"
          />
          <span className=" px-3 py-2 abolute  w-fit h-fit cursor-pointer rounded-full">
            <TiUpload className='text-2xl font-bold '/>
          </span>
        </label>


            </div>
            <div className='flex justify-center items-center gap-4 w-fit h-fit '>
            <label htmlFor="UserName" className='text-lg font-poppins font-medium '>UserName :</label>
            <input type="text" name='UserName' placeholder=' UserName'  className='outline-none px-3 py-2  border-b border-gray-400'/>
            </div>
            <div className='flex justify-center items-center gap-4 w-fit h-fit '>
            <label htmlFor="UserName" className='text-lg font-poppins font-medium '>Email :</label>
            <input type="text" name='Email' placeholder=' Email' className='outline-none px-3 py-2  border-b border-gray-400'/>
            </div>
            <div className='flex justify-center items-center gap-4 w-fit h-fit '>
            <label htmlFor="UserName" className='text-lg font-poppins font-medium '>Password :</label>
            <input type="password" name='Password' placeholder=' Password' className='outline-none px-3 py-2  border-b border-gray-400'/>
            </div>   
            <button type='Submit' className='w-full h-fit px-3 py-2 bg-red-600 text-white font-poppins text-xl font-medium'>Register</button>
            <div className='border border-gray-300 w-full relative'>
                <div className='w-fit h-fit px-2 py-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white'>OR</div>
             </div>
             <div className='flex justify-center items-center w-fit h-fit ring-1 ring-gray-200 px-3'>
                 <FaGoogle />
                <button className='w-full h-fit px-3 py-2 '>Continue With Google</button>
             </div>
            <div className='bg-gray-200 w-full h-20 rounded-xl flex justify-center items-center mt-2'>
              <h1>Already have an Account ? <NavLink to='/Login' className='text-red-600 hover:underline '>Login</NavLink></h1>
            </div>
        </form>
    </div>
    </div>
  </>
  )
}

export default SignUp