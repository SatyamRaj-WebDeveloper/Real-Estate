import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";


const Home = () => {
    const [expanded,setexpanded] = useState(false)



  return (
    <div className='flex flex-col justify-center items-center w-full h-fit'>
     <div className='sm:w-fit  w-auto sm:h-fit h-auto  text-black ring-1 ring-gray-500 sm:rounded-full mx-4 py-2 mb-10 '>
        <form className='flex sm:flex-row flex-col gap-8 justify-center items-center px-4 py-2 h-fit w-fit '>
            <div className='flex justify-center gap-2 items-center w-fit h-fit '>
            <IoLocationSharp  className='text-2xl text-red-600 '/>
            <input type="text" placeholder='Add Location' className='outline-none px-3 py-2 border-b border-slate-300'/>
            </div>
            <select name="Type" id="" className='outline-none px-3 py-2  '>
                <option value="For Sale" >For Sale</option>
                <option value="Rent" >Rent</option>
            </select>
            <div className='flex justify-center gap-2 items-center w-fit h-fit '>
            <MdOutlineCurrencyRupee className='text-2xl font-thin'/>
            <input type="text" placeholder='Enter Amount' className='outline-none px-3 py-2 border-b border-slate-300'/>
            </div>
            <div className='flex bg-red-600 text-white text-xl font-poppins rounded-full px-3 py-2  gap-4 justify-center items-center cursor-pointer '>
            <button
            type='Submit'
            >Search </button>
            <IoMdSearch className='text-2xl'/>
            </div>
           
        </form>
     </div>
     <h1 className='text-2xl font-poppins font-extralight tracking-widest border-b-4 border-cyan-500 mb-4'>Testimonials</h1>
    <div className='flex justify-center items-center w-full h-fit mb-10 gap-6 '>
        <div className='h-70 max-w-80 rounded-xl px-3 py-2 overflow-hidden ring-1 ring-gray-400 hover:shadow-xl '>
            <h1 className='text-lg font-poppins font-medium'>"Finding my dream home was a breeze!"</h1>
            <p><i>I never thought buying a home could be this easy. HARBORHOMES made the process seamless with their excellent selection of properties and user-friendly interface. I found my dream home within days, and the support from their team was top-notch. Highly recommended!
            </i></p>
            <h3><i>— Priya Sharma, Homeowner</i></h3>
        </div>
        <div className='h-70 max-w-80 rounded-xl px-3 py-2 overflow-hidden ring-1 ring-gray-400 hover:shadow-xl '>
            <h1 className='text-lg font-poppins font-medium'>"The best real estate platform out there."</h1>
            <p><i>As a first-time homebuyer, I was nervous about the process, but HARBORHOMES made everything so simple. From the detailed listings to the quick responses from agents, I felt supported every step of the way. I'm beyond satisfied with my new home! </i></p>
            <h3><i>— Rahul Verma, First-Time Buyer</i></h3>
        </div>
        <div className='h-70 max-w-80 rounded-xl px-3 py-2 overflow-hidden ring-1 ring-gray-400 hover:shadow-xl '>
            <h1 className='text-lg font-poppins font-medium'>"Incredibly professional and helpful!"</h1>
            <p><i>The team at HARBORHOMES truly knows how to cater to their clients. The platform is easy to navigate, and they have the best properties in top locations. I found exactly what I was looking for, and the communication was excellent throughout. </i></p>
            <h3><i>— Anjali Mehta, Property Investor</i></h3>
        </div>
    </div>

    <h1 className='text-2xl font-poppins font-extralight tracking-widest border-b-4 border-cyan-500 mb-4'>Advice & Tools</h1>
     <div className='w-full'>
        
        <div className='flex mx-8 justify-center items-center w-full h-fit mb-10 gap-6'>
            <div className='border border-gray-400  rounded-xl px-4 py-6 max-h-80 hover:shadow-xl hover:scale-110 transition-all'>
                <h1 className='text-lg font-poppins'>Rates & Trends</h1>
                <h2 className='text-lg font-light'>Know all about Property Rates & Trends in your city </h2>
                 <div className='flex justify-start gap-2 items-center w-fit h-fit px-3 py-2 '>
                <button className='text-red-600'>View Now</button>
                <FaArrowRightLong className='text-red-600'/>
                 </div>
             </div>
            <div className='border border-gray-400  rounded-xl px-4 py-6 max-h-80 hover:shadow-xl hover:scale-110 transition-all'>
                <h1 className='text-lg font-poppins'>EMI Calculator</h1>
                <h2 className='text-lg font-light'>Know how much you'll have to pay every month on your loan </h2>
                 <div className='flex justify-start gap-2 items-center w-fit h-fit px-3 py-2 '>
                <button className='text-red-600'>View Now</button>
                <FaArrowRightLong className='text-red-600'/>
                 </div>
             </div>
            <div className='border border-gray-400  rounded-xl px-4 py-6 max-h-96 hover:shadow-xl hover:scale-110 transition-all'>
                <h1 className='text-lg font-poppins'>Investment</h1>
                <h2 className='text-lg font-light'>Discover the localities in your city for investment</h2>
                 <div className='flex justify-start gap-2 items-center w-fit h-fit px-3 py-2 '>
                <button className='text-red-600'>View Now</button>
                <FaArrowRightLong className='text-red-600'/>
                 </div>
             </div>
            <div className='border border-gray-400 max-w-fit rounded-xl px-4 py-6 max-h-80 hover:shadow-xl hover:scale-110 transition-all mr-4'>
                <h1 className='text-lg font-poppins'>Research Insights</h1>
                <h2 className='text-lg font-light'>Get experts insights and research reports on real estate</h2>
                 <div className='flex justify-start gap-2 items-center w-fit h-fit px-3 py-2 '>
                <button className='text-red-600'>View Now</button>
                <FaArrowRightLong className='text-red-600'/>
                 </div>
             </div>
        </div>        
     </div>
    

      <div className='max-w-[700px] h-fit px-3 py-2 rounded-md ring-1 ring-red-500 flex flex-col justify-center items-center mb-8'>
        <h1 className='text-3xl font-bold font-poppins text-red-400 underline '>ABOUT US</h1>
        <p className='text-lg  font-'>
        At <i className='text-red-400'>HARBORHOMES</i>, we believe that finding the perfect home or property should be a seamless and enjoyable experience. With a deep understanding of the real estate market and a passion for helping people, we are dedicated to connecting buyers, sellers, and renters with the most desirable properties available.
        {
            expanded ? (
                <>
                Whether you're looking for a cozy apartment, a luxurious estate, or a commercial space for your business, we offer a curated selection of properties that meet your unique needs. Our platform is designed to provide an easy-to-navigate experience, helping you discover properties in the most sought-after neighborhoods, equipped with modern amenities and stunning designs.
                We pride ourselves on trust, transparency, and providing exceptional                 customer service. From the first property search to the final handshake,                 we are here to guide you every step of the way.
                Join us on a journey to find the perfect place to call home. Your dream                 property is just a click away....
                <button onClick={()=>setexpanded(false)}><i className='hover:underline hover:text-blue-400 text-sm '>Read less</i></button>
                </>
            ):(<>
            ...
            <button onClick={()=>setexpanded(true)}><i className='hover:underline hover:text-blue-400 text-sm '>Read More</i></button>
            </>)
        }


        </p>
      </div>


    </div>

    
  )
}

export default Home