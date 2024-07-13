import React from 'react'
import { IoGridOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

const Tab = () => {
  return (
    <div className='w-full flex bg-foreground justify-evenly items-center fixed bottom-0 left-0 border-t p-4 text-zinc-800' >
        <div>
            <GoHome fill='#e35565' floodColor={'#e35565'} size={25} />
        </div>
        <div>
            <IoGridOutline fill='#e35565' size={20} />
        </div>
        <div>
            <IoSettingsOutline fill='#e35565' size={20} />
        </div>
    </div>
  )
}

export default Tab
