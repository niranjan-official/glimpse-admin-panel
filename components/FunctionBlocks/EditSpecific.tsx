"use client";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import Image from "next/image";
import { MediaObject, Settings } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const EditSpecific = ({
  media,
  settings,
}: {
  media: MediaObject[];
  settings: Settings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(
    settings.multiMediaStore,
  );
  const Router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setSelectedMedia(settings.multiMediaStore);
    }
  }, [isOpen]);

  const editSpecific = async () => {
    setLoad(true);
    try {
      const res = await fetch('/api/update-settings', {
        method: "POST",
        body: JSON.stringify({
          data: selectedMedia,
          fieldName: "multiMediaStore",
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        setIsOpen(false);
        Router.refresh();
        toast({
          title: "Edit: 'Specific' mode",
          description: "Media in 'specific' mode have been successfully edited.",
          className: "text-black",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: error.message,
      });
    }
    setLoad(false);
  };

  const handleSpecific = (key: string, selected: boolean) => {
    if (selected) {
      setSelectedMedia((prevArray) => prevArray.filter((str) => str !== key));
    } else {
      setSelectedMedia((prevArray) => [...prevArray, key]);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex w-full justify-between rounded-[0.7rem] bg-white p-4 shadow">
          <div className="text-left">
            <h3 className="text-xl font-extrabold">Edit Specific</h3>
            <p className="text-sm text-neutral-400">
              Add/delete in 'specific' mode
            </p>
          </div>
          <div className="flex items-center rounded-[0.5rem] bg-primary-blue/20 p-2 text-primary-blue">
            <MdModeEditOutline size={25} />
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background" asChild>
        <div className="flex flex-col items-center justify-center text-black">
          <AlertDialogTitle className="text-center">
            <p className="text-2xl">Set the Media</p>
            <p className="text-sm font-normal text-neutral-400">
              Click on the media which is to be selected
            </p>
          </AlertDialogTitle>
          <div className="flex max-h-[60vh] w-full flex-wrap justify-center gap-2 overflow-y-scroll bg-white p-2 shadow">
            {!media[0] ? (
              <AiOutlineLoading
                size={20}
                className="my-8 animate-spin text-neutral-800/80"
              />
            ) : (
              media.map((item, index) => {
                const selected = selectedMedia.includes(item.key);
                return (
                  <button
                    onClick={() => handleSpecific(item.key, selected)}
                    key={index}
                    className="relative flex h-20 w-[calc(50%-0.25rem)] justify-center bg-zinc-800"
                  >
                    {item.mediaType === "image" ? (
                      <Image
                        width={100}
                        height={70}
                        className={`h-full w-auto ${selected && "opacity-40"}`}
                        src={item.mediaSrc}
                        alt="..."
                      />
                    ) : item.mediaType === "video" ? (
                      <video
                        width={100}
                        height={70}
                        className={`h-full w-auto ${selected && "opacity-40"}`}
                        src={item.mediaSrc}
                      />
                    ) : null}
                    {selected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-checks absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 12l5 5l10 -10" />
                        <path d="M2 12l5 5m5 -5l5 -5" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
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
              onClick={editSpecific}
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
  );
};

export default EditSpecific;
