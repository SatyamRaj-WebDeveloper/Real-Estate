import React ,{useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { CiUser } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [user,setuser]=useState([])
  const [profile,setprofile] = useState(false)
  const navigate = useNavigate()

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
        console.log("User Fetched Successfully")
        setuser([response.data.data])
      }).catch((error)=>{
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
}

const logoutadmin=()=>{
  try {
   let accessToken = localStorage.getItem('accessToken')
    axios.post('http://localhost:8000/api/v1/admin/AdminLogout',{},
      {
      headers:{
        'Authorization':`Bearer ${accessToken}`
      }
    }
  ).then((response)=>{
      console.log(response)
      localStorage.clear('accessToken')
      localStorage.clear('refreshToken')
      navigate('/')
    })
    .catch((error)=>console.log(error))
  } catch (error) {
    console.log(error)
  }
}


useEffect(()=>{
  getUser()
},[])

  return (
  <>
  <div className='w-full h-screen overflow-auto '>
   <div className='w-full h-18 bg-red-600 px-10 py-6 flex justify-between items-center'>
        <h1 className='text-xl font-poppins font-bold text-white '>HARBORHOMES</h1>
        <div className=' px-3 w-fit h-fit flex justify-center items-center gap-6 '>
            <NavLink className='text-xl hover:border-b border-white text-white font-roboto font-medium ' to='/' >Home</NavLink>
            <div>
              {
                 user.map((curr_user)=>(
                   <div key={curr_user.Email} className='flex justify-center items-center w-fit h-fit gap-2'>
                    <span className='text-white font-thin cursor-pointer'><i>{curr_user.UserName}</i></span>
                    <div className='w-fit h-fit border border-gray-100 rounded-full'>
                      <img src={curr_user.avatar} alt="userpic" className='rounded-full w-10 h-10 cursor-pointer' onClick={()=>setprofile(prev=>!prev)} />
                    </div>
                   </div>
                 ))
              }
            </div>
        </div>
    </div>
    {profile && <div className='flex flex-col justify-center items-center border border-gray-400 w-fit h-fit px-4 py-3 gap-4 rounded-lg absolute top-18 right-8 bg-white transition-all'>
                 <div className='flex justify-center items-center gap-2'>
                 <CiUser className='text-lg'/> 
                 <NavLink>My Profile</NavLink>
                 </div>
                  <div className='flex justify-center items-center gap-2' >
                  <MdOutlineEdit className='text-lg'/>
                  <NavLink>Edit Profile</NavLink>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                  <MdOutlinePostAdd className='text-lg'/>
                  <NavLink>Create Post</NavLink>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                  <CiLogout  className='text-lg '/>
                  <button onClick={()=>logoutadmin()}>Logout</button>
                  </div>
         <div className='w-7 h-7 border-top rotate-45 absolute top-[-15px] right-7 bg-white'></div>       
    </div>}

  </div>
  </>
  )
}

export default Posts