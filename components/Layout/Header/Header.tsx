import React from 'react'
import HamburgerButton from './hamburgerButton./hamburgerButton';
import UserIcon from './UserInfo/userIcon';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

type Props={
    setOpenbar:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({setOpenbar}:Props){
    
  return (
    <header className='w-full bg-white'>
        <div className=" text-white px-5 mb-0 flex justify-between items-center">
            <Link href={"/posts"}>
                <Image src={'/horizon-atlas/logo_.png'} alt={''} width={32} height={16} className='w-32 h-11 absolute top-[-8%] left-0.5' />
            </Link>
            <ul className="hidden md:flex items-center pt-2 text-sm duration-100">
                <li className="mr-4">
                    <Link href={'/user/setting'}>
                        <div className="text-neutral-400 hover:text-purple-500 flex flex-col items-center text-center">
                            <FaRegUser size={22} />
                            <p>ユーザー</p>
                        </div>
                    </Link>
                </li>
                <li className="mr-4">
                    <Link href={'/user/progress'}>
                        <div className="text-neutral-400 hover:text-purple-500 flex flex-col items-center text-center">
                            <FaArrowTrendUp size={22}/>
                            <p>進捗度</p>
                        </div>
                    </Link>
                </li>
                <li className="mr-4">
                    <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScW_wz_h2Yd5ij50k8vH91EPUn_0EenEOJ9M147bcVl8KTQLA/viewform?usp=dialog'} target='_brank' rel="noopener noreferrer">
                        <div className="text-neutral-400 hover:text-purple-500 flex flex-col items-center text-center">
                            <MdOutlineEmail size={22} />
                            <p>改善要請</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <UserIcon />
                </li>
            </ul>
            <ul className='flex md:hidden items-center text-sm pt-2'>
                <li>
                    <HamburgerButton setOpenSide={setOpenbar} />
                </li>
            </ul>
        </div>
    </header>
  )
}
