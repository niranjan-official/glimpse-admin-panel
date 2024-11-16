import Image from "next/image";
import React from "react";
import { MdOutlineVideocam } from "react-icons/md";

const MediaBlock = ({ src, type }: { src: string; type: string }) => {
  return (
    <div className="aspect-w-1 aspect-h-1 flex justify-center relative w-full bg-zinc-800">
      {type === "image" ? (
        <Image
          src={src}
          className="h-full w-auto object-contain"
          width={100}
          height={60}
          alt="..."
        />
      ) : type === "video" ? (
        <div className="relative h-full w-full">
          <video
            src={src}
            className="h-full w-auto object-contain"
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
    </div>
  );
};

export default MediaBlock;
