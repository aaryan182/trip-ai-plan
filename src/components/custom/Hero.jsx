import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] mt-16'>
        <span className='text-[#7D0DC3]'>Discover you next adventure with AI </span> : Personalised Trips</h1>
        <p className='text-xl text-[191919] text-center'>Plan your next trip with AI and get recommendations based on your preferences, location & budget</p>
        <Button>Get Started , It's Free</Button>
    </div>
  )
}

export default Hero