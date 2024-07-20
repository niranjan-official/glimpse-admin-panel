"use client";
import React, { useEffect, useState } from "react";
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
import { RiDeleteBinFill, RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { MdOutlineVideocam } from "react-icons/md";

const DeleteMedia = ({
  media,
  settings,
}: {
  media: MediaObject[];
  settings: Settings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState({ key: "" });
  const Router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setSelectedMedia({ key: "" });
    }
  }, [isOpen]);

  const deleteMedia = async () => {
    if (
      !confirm(
        "Deleting Media will remove it permanently from all modes. Are you sure?",
      )
    ) {
      return;
    }
    setLoad(true);
    try {
      const res = await fetch('/api/delete-media', {
        method: "POST",
        body: JSON.stringify({ settings, ...selectedMedia }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        setIsOpen(false);
        Router.refresh();
        toast({
          title: "Deletion Successful",
          description: "Media has been deleted permanently.",
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex w-full justify-between rounded-[0.7rem] bg-white p-4 shadow">
          <div className="text-left">
            <h3 className="text-xl font-extrabold">Delete Media</h3>
            <p className="text-sm text-neutral-400">
              Delete media permanently
            </p>
          </div>
          <div className="flex items-center rounded-[0.5rem] bg-primary-red/20 p-2 text-primary-red">
            <RiDeleteBinFill size={25} />
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background" asChild>
        <div className="flex flex-col items-center justify-center text-black">
          <AlertDialogTitle className="text-center">
            <p className="text-2xl">Select the Media</p>
            <p className="text-sm font-normal text-neutral-400">
              You can delete only one media item at a time.
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
                const selected = item.key === selectedMedia?.key;
                return (
                  <button
                    onClick={() => setSelectedMedia(item)}
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
                      <div className="relative h-full w-full">
                        <video
                          width={100}
                          height={70}
                          className={`h-full w-auto ${selected && "opacity-40"}`}
                          src={item.mediaSrc}
                          muted
                          autoPlay={false}
                          controls={false}
                        />
                        <MdOutlineVideocam
                          size={30}
                          className="absolute right-2 top-2 text-white"
                        />
                      </div>
                    ) : null}
                    {selected && (
                      <RiDeleteBin6Line
                        size={40}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
                      />
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
              onClick={deleteMedia}
            >
              {load ? (
                <AiOutlineLoading
                  size={20}
                  className="animate-spin text-white/80"
                />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMedia;
