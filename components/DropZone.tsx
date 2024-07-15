"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FcAddImage } from "react-icons/fc";

const DropZone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({accept, onDrop});

  return (
    <div className="flex w-full flex-col items-center rounded-xl border-2 border-dashed border-neutral-300 py-6 text-center">
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="flex flex-col items-center text-center">
          <FcAddImage size={50} />
          {isDragActive ? (
            <p className="font-bold text-blue-950 mt-2">
              Release to drop the files here
            </p>
          ) : (
            <p className="font-bold text-blue-950 mt-2">
              Drop your image here, or <span className="text-primary-blue cursor-pointer">browse</span>
            </p>
          )}
          <p className="text-sm text-neutral-400">Supports JPG, JPEG, PNG</p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
