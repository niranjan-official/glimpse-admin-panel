import React from "react";
import Header from "./Header";

interface DisplayBlock {
  color: string;
  header?: string;
  count?: number;
  subtitle?: string;
}
const DisplayBlock = ({ color, header, count, subtitle }: DisplayBlock) => { 
  return (
    <div
      className={`flex h-32 w-[calc(50%-0.5rem)] flex-col justify-between rounded-[0.7rem] p-4 text-white/80 shadow-md ${color}`}
    >
      <span className="font-bold">{header}</span>
      <div className="flex flex-col">
        <h5 className="text-3xl font-extrabold">{count}</h5>
        <p className="text-[0.7rem]">{subtitle}</p>
      </div>
    </div>
  );
};

export default DisplayBlock;
