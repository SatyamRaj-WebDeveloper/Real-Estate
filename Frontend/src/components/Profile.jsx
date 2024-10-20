import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { IoCloseCircleOutline } from "react-icons/io5";


const Profile = () => {
    const [user,setuser] = useState([])
    const [userId,setuserId] = useState('')
    const [posts,setposts]= useState([])
    const [clicked,setclicked] =useState(false)
    const [state,setstate] = useState()
    const [postId,setpostId] = useState('')
    const [clickedEdit,setclickedEdit] = useState(false)

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
         const formdata = new FormData()
         formdata.append('Image',e.target[0].files[0])
         formdata.append('Address',e.target[1].value)
         formdata.append('status',state)
         formdata.append('Price',e.target[3].value)
         
         try {
            const accessToken = localStorage.getItem('accessToken')
            axios.post('http://localhost:8000/api/v1/admin/createPost',formdata , {
              headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'Application/json'
              }
            })
            .then((response)=>{
              console.log(response)
              toast.success('Post Created Successfully')
              setclicked(false)
              getPosts()
            })
            .catch(error => console.log(error.message))
         } catch (error) {
          console.log("create Post Function did not work in Forntend")
         }
        
    }
         

    const DeletePost =()=>{
      try {
        // const accessToken = localStorage.getItem('accessToken')
        axios.delete(`http://localhost:8000/api/v1/admin/Posts/Delete/${postId}`)
        .then(response => {
          if(response.statusText == 'OK'){ 
            toast.success("Post Deleted Successfully ")
            getPosts();
          }

          console.log(response)})
        .catch(error=>console.log(error))
      } catch (error) {
        console.log("Frontend : Post CCould not be deleted")
      }
    }

    const EditPost =(e)=>{
         e.preventDefault();
         const formData = new FormData();
         formData.append('Image',e.target[0].files[0])
         formData.append('price' , e.target[1].value)
         formData.append('status', state)
        try {
          const accessToken = localStorage.getItem('accessToken')
          axios.patch(`http://localhost:8000/api/v1/admin/Posts/Update/${postId}`,formData ,{
            headers:{
              "Authorization":`Bearer ${accessToken}`
            }
           })
           .then(response => {
            if(response.statusText == 'Created'){
              toast.success("Post Updated Successfully ")
              setclickedEdit(false)
              getPosts();
            }else{
              toast.error("Post Could not Be Updated ")
            }
            console.log(response)})
           .catch(error =>console.log(error))
        } catch (error) {
          console.log("Frontend :: Error in update Post")
        }
         
         
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
    <div className={`${clicked ? 'blur-sm':''} ${clickedEdit?'blur-sm':''} w-full h-screen overflow-auto `}>
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
                </div> : <div className='grid sm:grid-cols-4 grid-cols-1  px-4 py-8  gap-x-60 md:gap-x-10 gap-y-6 '>
                  {
                    posts.map((post)=>(
                      <div key={post._id} className={`w-60  rounded-lg hover:shadow-xl hover:ring-1 hover:ring-slate-400 px-3 py-3 transition-all ${clickedEdit ? 'blur-sm':''} ${clicked ? 'blur-sm':''}`}>
                          <img src={post.Image} alt='post Image' className='w-80 h-60 rounded-lg hover:scale-110 transition-all hover:shadow-lg hover:mb-4' />
                          <div className='h-26'>
                          <p className='font-poppins font-medium '>{post.Address}</p>
                          <p className='font-poppins font-medium '>Status : {post.propertyStatus}</p>
                          <p className='font-poppins font-medium '>Price : {post.Price}</p>
                          </div>
                          <div className='flex flex-col justify-center items-center gap-2 mt-2 h-fit '>
                          <button className='text-lg font-poppins w-full h-fit px-3 rounded ring-1 ring-gray-500' type='button' onClick={()=>{
                            setclickedEdit(true)
                            setpostId(post._id)}}>Edit </button>
                          <button className='text-lg font-poppins w-full h-fit px-3 rounded ring-1 ring-gray-500'
                          type='button' onClick={()=>{
                            setpostId(post._id)
                            DeletePost()}}>Delete </button>
                          </div>
                      </div>
                    ))
                  }
                </div>
            }
            </div>
    </div>
    {clicked &&
    <div className='w-fit h-fit  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-8 py-4 bg-white ring-1 ring-gray-500 z-20 backdrop-blur-lg'>
             <div className='bg-white h-fit w-fit z-10 '>
                <form onSubmit={createPost} className='flex flex-col justify-center items-center gap-4 relative'>
                    {/* Image Field */}
                   <div className=' gap-2 justify-center items-center flex-col sm:flex-row  '>
                   <label htmlFor="Image" className='text-lg font-semibold font-poppins'>Image : </label>
                   <input type="file" name="Image" id="Image" />
                   </div>
                   {/* Address Field */}
                   <div className='gap-2 justify-center items-center flex-col sm:flex-row'>
                    <label htmlFor="Address" className='text-lg font-semibold font-poppins '>Address : </label>
                    <input type="text" name='Address' className='px-3 py-2 outline-none ring-1 ring-slate-400' placeholder='Address' required/>
                   </div>
                   {/* Property Status Field */}
                    <div className=' justify-center items-center flex-col sm:flex-row'>
                    <label htmlFor="Status" className='text-lg font-semibold font-poppins '>Property Status : </label>
                    <select name="Status" id="" onChange={(e)=>setstate(e.target.value)}  className='px-3 py-2 border-1 rounded border-gray-800 outline-none '>
                        <option value="For Sale"  className='bg-gray-300 text-black text-lg font-poppins font-light '>For Sale </option>
                        <option value="Rent"  className='bg-gray-300 text-black text-lg font-poppins font-light '>Rent </option>
                    </select>
                    </div>
                    {/* Price Field */}
                    <div className='gap-2 flex justify-center items-center w-fit h-fit '>
                      <label htmlFor="Price" className='text-lg font-semibold font-poppins '>Price :</label>
                      <input type="text" placeholder='₹ Enter Amount' className='px-3 py-2 outline-none ring-1 ring-slate-400' />
                    </div>
                    {/* Button */}
                    <button className='text-xl px-3 py-2 w-full h-fit font-poppins font-medium bg-red-600 mx-8 text-white  ring-1 ring-red-600 ' type='Submit'>Submit</button>
                    <IoCloseCircleOutline  className='absolute top-0 right-2 text-2xl font-bold hover:text-red-700 ' title='close' onClick={()=>setclicked(false)}/>
                </form>
            </div>
    </div> }
    {
      clickedEdit && (
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%]
        translate-y-[-50%] h-fit w-fit bg-white flex flex-col justify-center items-center rounded-lg gap-4 py-5 px-3 shadow-xl '>
          <p className='text-xl text-center leading-8'><i>You May Update Image, Price and Status of the Property </i></p>
          <form onSubmit={EditPost} className='flex flex-col justify-center items-center w-fit h-fit px-3 py-2 gap-4'>
           {/* Image Field */}
           <div className='flex justify-center items-center'>
           <label htmlFor="Image"  className='text-lg font-semibold font-poppins w-20'>Image :</label>
           <input type="file"  />
           </div>
           {/* Price Field */}
           <div className='flex justify-center items-center gap-2'>
           <label htmlFor="Price" className='text-lg font-semibold font-poppins '>Price : </label>
           <input type="text" className='px-3 py-2 ouline-none border border-gray-400 outline-none' placeholder='₹ New Price'/>
           </div>
            {/* Status Field */}
             <div className='flex justify-center items-center w-full gap-2 '>
             <label htmlFor="Status" className='text-lg font-semibold font-poppins'>Status : </label>
            <select name="Status" id="" className='px-3 py-2 border-1 rounded border-gray-800 outline-none ' onChange={(e)=>{
              setstate(e.target.value)
          }}>
              <option value="For Sale">For Sale</option>
              <option value="Rent">Rent </option>
            </select>
             </div>
            
            <button className='text-xl px-3 py-2 w-full h-fit font-poppins font-medium bg-red-600 mx-8 text-white  ring-1 ring-red-600 ' type='Submit'>Update</button>
            <IoCloseCircleOutline  className='absolute top-4 right-4 text-2xl font-bold hover:text-red-700 ' title='close' onClick={()=>setclickedEdit(false)}/>
          </form>
        </div>
      )
    }
    </div>
   </>
  )
}

export default Profile