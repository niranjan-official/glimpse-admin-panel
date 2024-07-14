'use client';
import React, { useCallback, useState } from "react";
import DropZone from "./DropZone";
import { nanoid } from 'nanoid';
import ImageGrid from "./ImageGrid";
import { Button } from "./ui/button";
import { MdFileUpload } from "react-icons/md";

const MediaUpload = () => {
  const [images, setImages] = useState<any>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: any) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState: any) => [
          ...prevState,
          { id: nanoid(), src: e.target?.result, size: file.size },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="flex flex-col items-center bg-white shadow rounded-2xl p-3">
      <DropZone onDrop={onDrop} accept={"image/*"} />
      <ImageGrid images={images} />
      {images[0] && (
        <Button className="flex items-center bg-zinc-800 hover:bg-zinc-950 px-6 mt-4">Upload <MdFileUpload size={20} className="text-white/80" /></Button>
      )}
    </main>
  );
};

export default MediaUpload;
