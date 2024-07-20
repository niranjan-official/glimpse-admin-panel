import Image from "next/image";
import React from "react";

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
        <video
          src={src}
          className="h-full w-auto"
          width={100}
          height={60}
        />
      ) : null}
    </div>
  );
};

export default MediaBlock;
