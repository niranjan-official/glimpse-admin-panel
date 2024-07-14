"use client";
import { rtdb } from "@/firebase/config";
import { increment, ref, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const RefreshBlock = () => {
  const [rotate, setRotate] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (disableButton) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setDisableButton(false);
            return 10;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [disableButton]);

  const refreshPage = () => {
    rotateIcon();
    try {
      const dbRef = ref(rtdb);
      const updates: any = {};
      updates[`/refresh`] = increment(1);
      update(dbRef, updates);
    } catch (error) {
      console.log(error);
    }
  };

  const rotateIcon = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
      disableRefresh();
    }, 1000);
  };

  const disableRefresh = () => {
    setDisableButton(true);
  };

  return (
    <div
      className={`flex h-32 w-[calc(50%-0.5rem)] flex-col justify-between rounded-[0.7rem] bg-primary-blue p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">Refresh</span>
      </div>
      <div className="flex flex-col">
        <button
          disabled={disableButton}
          onClick={refreshPage}
          className="w-fit"
        >
          <FiRefreshCcw
            strokeWidth={4}
            size={35}
            className={`${disableButton ? 'text-white/50' : 'text-white/80'} ${rotate && "animate-spin"}`}
          />
        </button>
        <p className="mt-2 text-[0.7rem]">
          {disableButton
            ? `Wait ${countdown} seconds`
            : "Click to refresh page"}
        </p>
      </div>
    </div>
  );
};

export default RefreshBlock;
