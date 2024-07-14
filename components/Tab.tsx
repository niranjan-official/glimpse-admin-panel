'use client';
import React from "react";
import { IoGridOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tab = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-evenly border-t bg-foreground p-4 text-zinc-800">
      <Link href={"/"}>
        <GoHome className={`${path === '/' && 'text-primary-red'}`} size={25} />
      </Link>

      <Link href={"/dashboard"}>
        <IoGridOutline className={`${path === '/dashboard' && 'text-primary-red'}`} size={20} />
      </Link>
      <Link href={"#"}>
        <IoSettingsOutline className={`${path === '/settings' && 'text-primary-red'}`} size={20} />
      </Link>
    </div>
  );
};

export default Tab;
