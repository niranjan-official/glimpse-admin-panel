import DeleteMedia from "@/components/FunctionBlocks/DeleteMedia";
import EditSingle from "@/components/FunctionBlocks/EditSingle";
import EditSpecific from "@/components/FunctionBlocks/EditSpecific";
import MediaUpload from "@/components/MediaUpload";
import { db } from "@/firebase/config";
import { Media, MediaObject, Settings } from "@/types";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";

export const revalidate = 0;

const getMedia = async () => {
  try {
    let mediaArray: MediaObject[] = [];
    const querySnapshot = await getDocs(collection(db, "media"));
    querySnapshot.forEach((doc) => {
      const mediaData = doc.data() as Media;
      mediaArray.push({ key: doc.id, ...mediaData });
    });
    return mediaArray;
  } catch (error: any) {
    console.log(error.message);
  }
  return;
};
const getSettings = async (): Promise<Settings | undefined> => {
  try {
    const docRef = doc(db, "settings", "general");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const settings = docSnap.data() as Settings;
      console.log(settings);

      return settings;
    } else {
      console.log("No such document!");
      return;
    }
  } catch (error: any) {
    console.log(error.message);
  }
  return;
};

const addImage = async ({
  imgSrc,
  imgRef,
}: {
  imgSrc: string;
  imgRef: string;
}) => {
  "use server";
  try {
    const docRef = await addDoc(collection(db, "media"), {
      imgSrc: imgSrc,
      imgRef: imgRef,
    });
    console.log("Document written with ID: ", docRef.id);
    return { ok: true };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const page = async () => {
  const [media, settings] = await Promise.all([getMedia(), getSettings()]);

  return (
    <div className="flex flex-col p-4 pb-16 pt-24 text-black">
      <MediaUpload addImage={addImage} />
      <div className="mt-4 flex w-full flex-col gap-4">
        <EditSingle media={media} settings={settings} />
        <EditSpecific />
        <DeleteMedia />
        <DeleteMedia />
      </div>
    </div>
  );
};

export default page;
