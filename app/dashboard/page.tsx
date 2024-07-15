import MediaUpload from "@/components/MediaUpload";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import React from "react";

const page = () => {
  const addImage = async (imageUrl: string) => {
    'use server'
    try {
      const docRef = await addDoc(collection(db, "media"), {
        imgSrc: imageUrl,
      });
      console.log("Document written with ID: ", docRef.id);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return (
    <div className="flex flex-col p-4 pb-16 pt-24 text-black">
      <MediaUpload addImage={addImage} />
    </div>
  );
};

export default page;
