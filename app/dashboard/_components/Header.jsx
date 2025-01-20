import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/logo2.png'} width={40} height={40} alt='logo'/>
        <UserButton/>
    </div>
  )
}

export default Header