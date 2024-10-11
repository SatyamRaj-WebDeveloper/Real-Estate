import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import axios from 'axios';
import{ toast }from 'react-toastify';

const Login = () => {

    const handleLogin = (e)=>{
          e.preventDefault();
          const formData = {
            UserName : e.target[0].value,
            Email :e.target[1].value,
            Password:e.target[2].value
          }
          try {
            axios.post('http://localhost:8000/api/v1/users/login', formData)
            .then(response => {
              toast.success("User Logged In Successfully")
            })
            .catch((error)=>{
              if(error.response.data.message === 'No user Found')
                toast.error("Invalid User");
            })
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
    <div className='w-full h-full flex justify-center items-center '>
    <div className='flex flex-col justify-center items-center border border-gray-400 w-fit  h-[600px]  px-8 rounded-xl bg-white'>
        <h1 className='text-4xl font-bold  font-poppins text-red-600 mb-6'>Login</h1>
        <form onSubmit={handleLogin}  className='flex flex-col justify-center items-center gap-8 ' >
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
            <button type='Submit' className='w-full h-fit px-3 py-2 bg-red-600 text-white font-poppins text-xl font-medium'>Submit</button>
             <div className='border border-gray-300 w-full relative'>
                <div className='w-fit h-fit px-2 py-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white'>OR</div>
             </div>
             <div className='flex justify-center items-center w-fit h-fit ring-1 ring-gray-200 px-3'>
                 <FaGoogle />
                <button className='w-full h-fit px-3 py-2 '>Continue With Google</button>
             </div>
            <div className='bg-gray-200 w-full h-20 rounded-xl flex justify-center items-center'>
              <h1>New To HarborHomes ? <NavLink to='/SignUp' className='text-red-600 hover:underline '>SignUp</NavLink></h1>
            </div>
        </form>
     </div>
    </div>
    
    </div>
    
    </>
  )
}

export default Login