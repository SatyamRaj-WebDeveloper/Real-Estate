import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';



const AdminLogin = () => {
    const [clicked,setclicked] = useState(false);
    const [email,setemail] = useState('');
    const [otp,setotp] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin =(e)=>{
          e.preventDefault();
          const formdata = {
            Email : email,
            Password : e.target[1].value,
          }
          try {
            axios.post('http://localhost:8000/api/v1/admin/AdminLogin' , formdata)
            .then((response)=> {
              console.log("Form Submitted Successfully",response)
              setclicked(true)
            })
            .catch((error)=> {
              console.log(error)
              if(error.message === 'Invalid Email')
                toast.error('Invalid Email or Password')
                })
          } catch (error) {
            console.log(error.message)
          }
    }

    const ConfirmOtp = (email,otp)=>{
      console.log(email,otp)
        const formData = {
            Email : email,
            Code : otp ,
        }
        try {
            axios.post('http://localhost:8000/api/v1/admin//AdminLogin/verifyCode' ,formData)
            .then((response)=> {
              console.log(response)
              localStorage.setItem('accessToken' , response.data.data.accessToken)
              localStorage.setItem('refreshToken' , response.data.data.refreshToken)
             navigate('/Posts')
            })
            .catch((error)=>{
              if(error.response.data.message === "verifyCode :: Code Was not verified/ Invalid Code")
              toast.error("Please Enter a Valid OTP")
              console.log(error)})
        } catch (error) {
            console.log(error)
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
    <div className='w-full h-screen overflow-auto flex justify-center items-center'>
         <form onSubmit={handleAdminLogin} className='flex flex-col justify-center items-center gap-8 border border-gray-500 w-fit h-fit px-6 py-8 rounded-lg bg-white'>
         <h1 className='text-3xl text-red-600 font-bold '>Login</h1>
            <div className='w-fit h-fit gap-6 flex justify-center items-center '>
                <label htmlFor="Email" className='font-poppins text-lg font-medium '>Email :</label>
                <input type="Email" name="email" id="email"  onChange={(e)=>setemail(e.target.value)} placeholder='Email' required className='focus:border-b focus:border-gray-400 px-3 py-2 outline-none border'/>  
            </div>
            {/* {email === '' ? <sapn className='text-sm text-red-500 font-poppins'>'Email is Required'</sapn>:null} */}
            <div className='w-fit h-fit gap-6 flex justify-center items-center '>
                <label htmlFor="Email" className='font-poppins text-lg font-medium '>Password :</label>
                <input type="password" name="password" id="password"  placeholder='Password' required  className='focus:border-b focus:border-gray-400 px-3 py-2 outline-none border'/>
            </div>
            {
              clicked && email!==''? (<span className='text-red-600 font-poppins  text-lg '>"Please Enter the OTP, Sent to Email"</span>):null
            }
            {
                clicked && email!==''? (
                    <div className='w-fit h-fit flex justify-center items-center gap-6 '>
                        <label htmlFor="" className='font-poppins text-lg font-medium '>Enter OTP : </label>
                        <input type="text" placeholder='Enter OTP' className='focus:border-b focus:border-gray-400 px-3 py-2 outline-none border' onChange={(e)=>setotp(e.target.value)}/>
                    </div>
                ):null
            }
            {
                clicked && email!=='' ? (<button className='cursor-pointer w-full h-10 px-3 py-2 bg-red-600 text-white text-xl font-poppins' type='button'  onClick={()=>ConfirmOtp(email,otp)}>
                   Login
                </button>) : (<button  type='Submit' className='cursor-pointer w-full h-10 px-3 py-2 bg-red-600 text-white text-xl font-poppins'>
             Submit
            </button>)
            }

              <div className='bg-gray-200 w-full h-20 rounded-xl flex justify-center items-center'>
              <h1>New To HarborHomes ? <NavLink to='/SignUp' className='text-red-600 hover:underline '>SignUp</NavLink></h1>
            </div>
            
         </form>
    </div>
    </div>
    </>
  )
}

export default AdminLogin