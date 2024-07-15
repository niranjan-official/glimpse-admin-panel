'use client'
import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";

const DeleteMedia = () => {
  return (
    <button className="flex w-full justify-between rounded-[0.7rem] bg-white p-4 shadow">
      <div className='text-left'>
        <h3 className="text-xl font-extrabold">Delete Media</h3>
        <p className="text-sm text-neutral-400">Delete images permanently</p>
      </div>
      <div className="flex items-center rounded-[0.5rem] bg-primary-red/20 p-2 text-primary-red">
        <RiDeleteBinFill size={25} />
      </div>
    </button>
  );
};

export default DeleteMedia;
