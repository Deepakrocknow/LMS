import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
       <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
       <p className='text-gray-500 sm:text-sm'>Unlock your potential with unlimited learning opportunities. The world of knowledge is just a click away—start now!</p>
       <div className='flex items-center font-medium gap-6 mt-4'>
          <button className='px-10 py-3 bg-blue-600 text-white rounded-md'>Get Started</button>
          <button className='flex items-center gap-2 '>Learn More <img src={assets.arrow_icon} alt='arrow'/> </button>
       </div>
    </div>
  )
}

export default CallToAction