import Image from "next/image";
import React from "react";
import { MdOutlineVideocam } from "react-icons/md";

const MediaBlock = ({ src, type }: { src: string; type: string }) => {
  return (
    <div className="flex h-24 w-[calc(50%-0.25rem)] justify-center overflow-hidden bg-zinc-800">
      {type === "image" ? (
        <Image
          src={src}
          className="h-full w-auto"
          width={100}
          height={60}
          alt="..."
        />
      ) : type === "video" ? (
        <div className="relative w-full h-full">
          <video
            src={src}
            className="h-full w-auto"
            width={100}
            height={60}
            muted
            autoPlay={false}
            controls={false}
          />
          <MdOutlineVideocam
            size={30}
            className="absolute top-2 right-2 text-white"
          />
        </div>
      ) : null}
    </div>
  );
};

export default MediaBlock;
