"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "../ui/use-toast";

const ModeBlock = ({ currentMode }: { currentMode?: string }) => {
  const [mode, setMode] = useState(currentMode);
  const [isOpen, setIsOpen] = useState(false);
  const [newMode, setNewMode] = useState(
    currentMode === "multiple" ? "specific" : currentMode,
  );
  const [load, setLoad] = useState(false);
  const { toast } = useToast();

  const changeMode = async () => {
    setLoad(true);
    try {
      const res = await fetch('/api/update-settings', {
        method: "POST",
        body: JSON.stringify({
          data: newMode === "specific" ? "multiple" : newMode,
          fieldName: "displayMode",
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        setMode(newMode);
        setIsOpen(false);
        toast({
          title: "Mode updation successfull",
          description: `Mode has been updated to '${newMode}'`,
          className: "text-black",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error Occured",
        description: error.message,
      });
    }
    setLoad(false);
  };
  return (
    <div
      className={`flex h-32 w-[calc(50%-0.5rem)] flex-col justify-between rounded-[0.7rem] bg-primary-red p-4 text-white/80 shadow-md`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-bold">Mode</span>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <button className="rounded-[0.3rem] bg-white/20 p-1">
              <MdEdit size={25} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background" asChild>
            <div className="flex flex-col items-center justify-center text-black">
              <AlertDialogTitle>
                <p className="text-2xl">Select required mode</p>
              </AlertDialogTitle>
              <div className="flex w-full justify-center">
                <Select value={newMode} onValueChange={setNewMode}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent className="focus:outline-none focus:ring-0">
                    <SelectGroup>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="specific">Specific</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full flex-col items-center text-[0.7rem] text-neutral-500">
                <h5 className="text-sm">Working</h5>
                <p>All: Displays all the available Images</p>
                <p>Specific: Displays only the specific Images</p>
                <p>Single: Displays only a single Image</p>
              </div>
              <div className="flex w-full justify-center gap-4">
                <Button
                  disabled={load}
                  className="rounded-[0.4rem] bg-neutral-200 text-neutral-800 shadow disabled:text-neutral-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={load}
                  className="w-36 rounded-[0.4rem] bg-primary-red shadow hover:bg-red-600"
                  onClick={changeMode}
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
        <h5 className="text-3xl font-extrabold capitalize">
          {mode === "multiple" ? "specific" : mode}
        </h5>
        <p className="text-[0.7rem]">Current display mode</p>
      </div>
    </div>
  );
};

export default ModeBlock;
