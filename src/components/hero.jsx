import React from 'react'
import img from '../assets/ai_text.png'

function hero() {
  return (
    <div className='h-screen w-full flex items-end px-10 z-[1000]'>
        <div className='space-y-5 py-10'>
          <h1 className='text-7xl text-white cursor-pointer'>iPhone 16</h1>
          <div className='border  w-1/2'>
            <img src={img} alt="" className='w-full h-full'/>
          </div>
        </div>
    </div>
  )
}

export default hero