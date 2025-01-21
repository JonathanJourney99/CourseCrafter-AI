import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Link href={"/"}>
        <Image src={"/logo2.png"} width={80} height={30} alt="logo" />
      </Link>
        <UserButton/>
    </div>
  )
}

export default Header