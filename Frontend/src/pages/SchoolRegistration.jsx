import React from 'react'
import { IoAddCircleSharp } from "react-icons/io5";

export const SchoolRegistration = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
        <form className='flex flex-col items-center space-y-4 shadow-md p-6 bg-white rounded-xl' action="">
            <div className='relative'>
                <div className='h-[85px] w-[85px] border rounded-full flex justify-center items-center'>Logo</div>
                <IoAddCircleSharp className='absolute bottom-1 right-0 rounded-full bg-white text-2xl'/>
            </div> 
            <input className='border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400' type="text" placeholder="Enter School Name..." />
            <input className='border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400' type="email" placeholder="Enter School Name..." />
            <input className='border rounded outline-none py-2 px-3 w-64 focul:ring-2 focus:ring-blue-400' type="password" placeholder="Enter School Name..." />
            <button className='py-2 px-4 w-64 bg-blue-500 hover:bg-blue-600 rounded text-white' type='submit'>Submit</button>
        </form>
    </div>
  )
}
