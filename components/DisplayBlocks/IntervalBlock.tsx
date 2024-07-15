"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { FaMinus } from "react-icons/fa6";

const IntervalBlock = ({ currentInterval }: { currentInterval?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [interval, setInterval] = useState<number>(currentInterval || 0);
  const [newInterval, setNewInterval] = useState<number>(currentInterval || 0);

  const changeInterval = async () => {
    setLoad(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-settings`,
        {
          method: "POST",
          body: JSON.stringify({
            data: newInterval,
            fieldName: 'carouselInterval'
          }),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (res.ok) {
        setInterval(newInterval);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      alert("Error Occured !");
    }
    setLoad(false);
  };

  const handleMinus = () => {
    if (newInterval > 0) {
      setNewInterval((prev) => prev - 1);
    }
  };
  return (
    <div
      className={`flex h-32 w-[calc(50%-0.5rem)] flex-col justify-between rounded-[0.7rem] bg-primary-yellow p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">Interval</span>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <button className="rounded-[0.3rem] bg-white/20 p-1">
              <FaPlus size={25} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background" asChild>
            <div className="flex flex-col items-center justify-center text-black">
              <AlertDialogTitle>
                <p className="text-center text-2xl">Set Carousel Interval</p>
              </AlertDialogTitle>
              <div className="flex w-full items-center justify-center gap-4">
                <Button className="" onClick={handleMinus}>
                  <FaMinus size={20} />
                </Button>
                <input
                  value={newInterval}
                  onChange={(e) => setNewInterval(parseInt(e.target.value, 10))}
                  type="number"
                  className="w-12 rounded-[0.3rem] border border-neutral-600 bg-transparent py-2 text-center text-2xl font-bold"
                />
                <Button
                  className=""
                  onClick={() => setNewInterval((prev) => prev + 1)}
                >
                  <FaPlus size={20} />
                </Button>
              </div>
              <p className="text-center text-sm text-neutral-500">
                Set the interval in seconds for media transition
              </p>
              <div className="flex w-full justify-center gap-4">
                <Button
                  className="rounded-[0.4rem] bg-neutral-200 text-neutral-800 shadow"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={load}
                  className="w-36 rounded-[0.4rem] bg-primary-red shadow hover:bg-red-600"
                  onClick={changeInterval}
                >
                  {load ? (
                    <AiOutlineLoading
                      size={20}
                      className="animate-spin text-white/80"
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col">
        <h5 className="text-3xl font-extrabold capitalize">{interval}sec</h5>
        <p className="text-[0.7rem]">Time between slides</p>
      </div>
    </div>
  );
};

export default IntervalBlock;
