import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';
import { IoIosLogOut } from "react-icons/io";

function UserBlock() {
    const [isVisible, setIsVisible] = useState(false); // トグルの状態を管理
    const toggleRef = useRef<HTMLDivElement>(null); // toggle要素への参照
    const toggleTargetRef = useRef<HTMLDivElement>(null);
    const { user,logout } = useAuth0();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          // toggleTargetまたはtoggleの外部がクリックされた場合に非表示
          if (
            toggleTargetRef.current &&
            !toggleTargetRef.current.contains(target) &&
            toggleRef.current &&
            !toggleRef.current.contains(target)
          ) {
            setIsVisible(false);
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                ref={toggleRef}
                onClick={(event) => {
                  event.stopPropagation(); // クリックイベントの伝播を防ぐ
                  setIsVisible((prev) => !prev); // 状態を切り替え
                }} 
                className='flex cursor-pointer gap-1.5 mt-2 border border-neutral-300 rounded p-1'>
                <div>
                    <Image width={20} height={20} 
                    src={user?.picture || ""} alt={''}
                    className='rounded-full w-9 h-auto' />
                </div>
                <div>
                    <p className='mt-1.5 mr-0.5 text-sm text-neutral-500'>{user?.name}</p>
                </div>
            </div>
            {isVisible && (
              <div
                id="toggleTarget" ref={toggleTargetRef}
                className="z-50 border-solid border-neutral-300 border absolute bg-white p-1.5 rounded-md w-32 translate-y-[100%] right-5">
                <ul>
                    <button onClick={() => logout()} className="flex relative hover:bg-slate-200 rounded-sm p-1 pr-2">
                        <IoIosLogOut size={21} className='mr-1' />
                        <p className="text-neutral-600 text-sm">ログアウト</p>
                    </button>
                </ul>
            </div>)}
        </>
    )
}

export default UserBlock;