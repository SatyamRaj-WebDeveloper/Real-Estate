import React from 'react'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const CreatePost = ({setpost}) => {
    const createPost =(e)=>{
        e.preventDefault();
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
   <>
      <div className='w-fit h-fit  z-10'>
        {/* <form onSubmit={createPost} className='flex flex-col justify-center items-center gap-8 px-4 py-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border border-gray-400'>
           <div>
           <label htmlFor="Image" className='text-lg font-poppins font-medium mr-2'>Image : </label>
           <input type="file" />
           </div>
           <div>
           <label htmlFor="Status" className='text-lg font-poppins font-medium mr-2' >Status :</label>
            <select name="Status" id="" className='px-3 py-2 border-b border-gray-300 hover:bg-gray-100 hover:text-gray-600 outline-none rounded-lg'>
                <option value="For Sale">For Sale</option>
                <option value="Rent">Rent</option>
            </select>
           </div>
           <div>
            <label htmlFor="Address" className='text-lg font-poppins font-medium mr-2'>Address :</label>
            <input type="text" className='px-3 py-2 outline-none border border-gray-200' placeholder='Address' />
           </div>
           <div>
            <label htmlFor="Price" className='text-lg font-poppins font-medium mr-2' >Price :</label>
            <input type="text" className='px-3 py-2 outline-none border border-gray-200' placeholder=' Price' />
           </div>
           <button type='Submit' className='w-full bg-red-600 text-white px-3 py-2 font-poppins text-lg'>Submit</button>
           <IoMdClose  className='text-2xl text-red-600 absolute top-6 right-8 hover:rotate-180 hover:transition-all' title='close'onClick={()=>setpost(false)}/>
        </form> */}
      </div>
   </>
  )
}

export default CreatePost