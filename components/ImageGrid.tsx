import React from "react";

const ImageGrid = ({ images }: { images: any }) => {
  console.log(images);

  return (
    <div className="mt-3 flex w-full flex-col items-start gap-3">
      {images?.map((image, index) => (
        <div key={index} className="flex h-12 w-full gap-2">
          <img src={image.src} className="h-full w-auto" alt="..." />
          <div className="flex flex-col">
            <p className="text-[0.7rem] font-bold">img-{image.id}</p>
            <span className="text-[0.7rem] text-neutral-400">
              Size: {(image.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
