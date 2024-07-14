"use client";
import { rtdb } from "@/firebase/config";
import { increment, ref, update } from "firebase/database";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

const RefreshBlock = () => {
  const refreshPage = () => {
    try {
      const dbRef = ref(rtdb);
      const updates: any = {};
      updates[`/refresh`] = increment(1);
      update(dbRef, updates);

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`flex h-32 w-[calc(50%-0.5rem)] flex-col justify-between rounded-[0.7rem] bg-primary-blue p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">Refresh</span>
      </div>
      <div className="flex flex-col">
        <button onClick={refreshPage}>
          <FiRefreshCcw size={30} className="text-white/80" />
        </button>
        <p className="mt-2 text-[0.7rem]">Click to refresh page</p>
      </div>
    </div>
  );
};

export default RefreshBlock;
