import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between bg-background p-4 py-2 shadow-md z-50">
      <div className="flex flex-col">
        <h2 className="text-sm text-neutral-400">Glimpse PRC</h2>
        <h1 className="text-2xl font-extrabold text-black">Admin Panel</h1>
      </div>
      <Image src={"/images/prc-logo.png"} width={70} height={70} alt="..." />
    </div>
  );
};

export default Header;
