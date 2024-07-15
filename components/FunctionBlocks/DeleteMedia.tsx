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
import { RiDeleteBinFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteMedia = ({
  media,
  settings,
}: {
  media: MediaObject[];
  settings: Settings;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ key: "" });
  const Router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage({ key: "" });
    }
  }, [isOpen]);

  const deleteImage = async () => {
    if (
      !confirm(
        "Deleting Image will remove it permanently from all modes. Are you Sure ?",
      )
    ) {
      return;
    }
    setLoad(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-image`,
        {
          method: "POST",
          body: JSON.stringify({ settings, ...selectedImage }),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (res.ok) {
        setIsOpen(false);
        Router.refresh();
      }
    } catch (error) {
      console.log(error);
      alert("Error Occured !");
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
              Delete images permanently
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
            <p className="text-2xl">Select the image</p>
            <p className="text-sm font-normal text-neutral-400">
              You can delete only one image at a time.
            </p>
          </AlertDialogTitle>
          <div className="flex max-h-[60vh] w-full flex-wrap justify-center gap-2 p-2 bg-white shadow overflow-y-scroll">
            {!media[0] ? (
              <AiOutlineLoading
                size={20}
                className="my-8 animate-spin text-neutral-800/80"
              />
            ) : (
              media.map((image, index) => {
                const selected = image.key === selectedImage?.key;
                return (
                  <button
                    onClick={() => setSelectedImage(image)}
                    key={index}
                    className="relative flex h-20 w-[calc(50%-0.25rem)] justify-center bg-zinc-800"
                  >
                    <Image
                      width={100}
                      height={70}
                      className={`h-full w-auto ${selected && "opacity-40"}`}
                      src={image.imgSrc}
                      alt="..."
                    />
                    {selected && (
                      <RiDeleteBin6Line
                        size={40}
                        className="absolute left-[50%] top-[50%] text-white"
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
              onClick={deleteImage}
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
