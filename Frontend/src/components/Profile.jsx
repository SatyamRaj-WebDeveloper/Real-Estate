import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Profile = () => {
    const [user,setuser] = useState([])
    const [userId,setuserId] = useState('')
    const [posts,setposts]= useState([])
    const [clicked,setclicked] =useState(false)

    const getUser =()=>{
        try {
          let accessToken = localStorage.getItem('accessToken')
          axios.get('http://localhost:8000/api/v1/admin/AdminUser',
            {
              headers : {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type':'Application/json'
              }
            }
          ).then((response)=>{
            setuser([response.data.data])
          }).catch((error)=>{
            console.log(error)
          })
        } catch (error) {
          console.log(error)
        }
    }

    const getPosts = (userId)=>{
        try {
            const accessToken = localStorage.getItem('accessToken')
            axios.get(`http://localhost:8000/api/v1/admin/UserPost/${userId}`,{
                headers:{
                    'Authorization':`Bearer ${accessToken}`,
                }
            })
            .then((response)=>{
                setposts(response.data.posts)
            })
            .catch((error)=>console.log(error))
        } catch (error) {
            console.log("get Posts function did not work From Frontend" ,error.message)
        }
    }

    const createPost=(e)=>{
         e.preventDefault();
         console.log(e)
         const formdata = new FormData()
         formdata.append('Image',e.target[0].files)
         formdata.append('Address',e.target[1].value)
         formdata.append('')
    }

    useEffect(()=>{
        getUser();
        setuserId(user._id)
        getPosts()
    },[])

  return (
   <>
    <div className={` w-full h-screen overflow-auto flex justify-center flex-col items-center relative`}>
    <div className='w-full h-18 bg-red-600 px-10 py-6 flex justify-between items-center'>
        <h1 className='text-xl font-poppins font-bold text-white '>HARBORHOMES</h1>
        <NavLink className='text-xl hover:border-b border-white text-white font-roboto font-medium ' to='/'>Home</NavLink>
    </div>
    <div className='w-full h-screen overflow-auto '>
            {
                user.map((curr_user)=>{
                    return (
                        <div key={curr_user._id} className='flex flex-col justify-center items-center mt-6'>
                        <img src={curr_user.avatar} alt="Profile Image" className='w-80 h-80 object-cover rounded-full border border-gray-500 shadow-xl'/>
                        <p className='text-4xl font-medium font-poppins mt-2'>{curr_user.UserName}</p>
                        <span className='text-xl '><i>{curr_user.Email}(admin)</i></span>
                        </div>
                    )
                })
            }
            <div className='flex  justify-center items-center w-full h-fit  mt-10'>
            <div className=' flex  flex-col justify-center items-center w-full h-auto  ml-20'>
                <h1 className='text-center text-3xl font-poppins font-light text-gray-500'>Your Post</h1>
                <div className='border-3 w-16 rounded-lg border-cyan-500 border-b '></div>
            </div>
            <button className='text-xl px-3 py-2 w-fit h-fit font-poppins font-medium bg-red-600 mx-8 text-white  ring-1 ring-red-600 ' type='button' onClick={()=>setclicked(true)} >CreatePost</button>
            </div>
              <hr  className='mt-6'/>
            <div className={`w-full h-auto grid  place-content-center ${posts>0 ? 'grid-cols-4' : null} `}>
            {
                posts.length<=0 ? <div>
                    <p className='text-3xl font-roboto font-bold mt-16'><i>No Post Created Yet...</i></p>
                </div> : <div>
                  
                </div>
            }
            </div>
    </div>
    {clicked &&
    <div className='w-fit h-fit  absolute top-[50%] left-[50%] translate-x-[-50%]  px-8 py-4 bg-white ring-1 ring-gray-500 z-20 backdrop-blur-lg'>

             <div className='bg-white h-fit w-fit z-10 '>
                <form onSubmit={createPost} className='flex flex-col justify-center items-center gap-4 '>
                    {/* Image Field */}
                   <div className=' gap-2 justify-center items-center flex-col sm:flex-row  '>
                   <label htmlFor="Image" className='text-lg font-semibold font-poppins w-20'>Image : </label>
                   <input type="file" name="Image" id="Image" />
                   </div>
                   {/* Address Field */}
                   <div className='gap-2 justify-center items-center flex-col sm:flex-row'>
                    <label htmlFor="Address" className='text-lg font-semibold font-poppins '>Address : </label>
                    <input type="text" name='Address' className='px-3 py-2 outline-none ring-1 ring-slate-400' placeholder='Address' required/>
                   </div>
                   {/* Property Status Field */}
                    <div className='gap-2 justify-center items-center flex-col sm:flex-row'>
                    <label htmlFor="Status" className='text-lg font-semibold font-poppins '>Property Status : </label>
                    <select name="Status" id="">
                        <option value="For Sale">For Sale </option>
                        <option value="Rent">Rent </option>
                    </select>
                    </div>
                    {/* Button */}
                    <button className='text-xl px-3 py-2 w-full h-fit font-poppins font-medium bg-red-600 mx-8 text-white  ring-1 ring-red-600 ' type='Submit'>Submit</button>
                </form>
            </div>
    </div>
           }
    </div>
   </>
  )
}

export default Profile