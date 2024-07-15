'use client'
import React from 'react'
import { MdModeEditOutline } from "react-icons/md";

const EditSpecific = () => {
  return (
    <button className="flex w-full justify-between rounded-[0.7rem] bg-white p-4 shadow">
      <div className='text-left'>
        <h3 className="text-xl font-extrabold">Edit Specific</h3>
        <p className="text-sm text-neutral-400">Add/delete in 'specific' mode</p>
      </div>
      <div className="flex items-center rounded-[0.5rem] bg-primary-blue/20 p-2 text-primary-blue">
        <MdModeEditOutline size={25} />
      </div>
    </button>
  )
}

export default EditSpecific
