'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { HiOutlineHome, HiOutlineShieldCheck, HiOutlineLogout } from "react-icons/hi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '../layout'; 

function SideBar() {
  const [userCourseListlen] = useContext(UserCourseListContext); 

  const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <HiOutlineHome />,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Explore',
      icon: <HiOutlineSquare3Stack3D />,
      path: '/dashboard/explore'
    },
  ];

  const path = usePathname();

  return (
    <div className='fixed h-full md:w-64 p-5 shadow:md'>
      <Link href={"/"}>
        <Image src={"/logo2.png"} width={80} height={30} alt="logo" />
      </Link>
      <hr className='my-5' />

      <ul>
        {Menu.map((item) => (
          <Link key={item.id} href={item.path}>
            <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-lg ${item.path === path && 'bg-gray-100 text-black'}`}>
              <div className='text-2xl'>{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>

      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseListlen / 5) * 100} /> {/* Example: adjust based on your maximum course count */}
        <h2 className='text-sm my-2'>{userCourseListlen} out of 5 Course created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade Plan for Exciting Courses</h2>
      </div>
    </div>
  )
}

export default SideBar;
