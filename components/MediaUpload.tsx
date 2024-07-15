"use client";
import React, { useCallback, useState } from "react";
import DropZone from "./DropZone";
import { nanoid } from "nanoid";
import ImageGrid from "./ImageGrid";
import { Button } from "./ui/button";
import { MdFileUpload } from "react-icons/md";
import { storage } from "@/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlineLoading } from "react-icons/ai";

const MediaUpload = ({ addImage }) => {
  const [images, setImages] = useState<any>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: any) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState: any) => [
          ...prevState,
          { id: nanoid(), src: e.target?.result, size: file.size, file },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const uploadFiles = async () => {
    setUploading(true);
    const uploadPromises = images.map((image: any) => {
      const storageRef = ref(storage, `images/${image.id}`);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                const res = await addImage(downloadURL);
                if (res.ok) {
                  console.log("Image added successfully");
                }
                resolve(downloadURL);
              },
            );
          },
        );
      });
    });
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setImages([]);
      console.log("All files uploaded", downloadURLs);
    } catch (error) {
      console.error("Error uploading files", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="flex flex-col items-center rounded-2xl bg-white p-3 shadow">
      <DropZone onDrop={onDrop} accept={"image/*"} />
      <ImageGrid images={images} />
      {images[0] && (
        <Button
          disabled={uploading}
          onClick={uploadFiles}
          className="mt-4 flex items-center bg-zinc-800 px-6 hover:bg-zinc-950"
        >
          Upload
          {uploading ? (
            <AiOutlineLoading
              size={20}
              className="animate-spin text-white/80 ml-2"
            />
          ) : (
            <MdFileUpload size={20} className="text-white/80" />
          )}
        </Button>
      )}
    </main>
  );
};

export default MediaUpload;
