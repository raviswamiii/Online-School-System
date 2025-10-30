import React from 'react'

export const SchoolList = () => {
  return (
    <div className='h-full'>
      <div className='border p-2 flex items-center gap-2'>
        <div className='border rounded-full h-[70px] w-[70px] flex justify-center items-center'>logo</div>
        <div>
          <p>School Name</p>
          <p>Location</p>
        </div>
      </div>
    </div>
  )
}
