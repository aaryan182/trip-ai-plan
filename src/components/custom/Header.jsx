import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-center items-center px-5'>
        <img src='/image.png' alt="logo" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header