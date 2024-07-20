import { db, storage } from "@/firebase/config";
import { Settings } from "@/types";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const media = await req.json();

    const [deleteData, deleteSource, deleteModeData] = await Promise.all([
      deleteImgData(media.key),
      deleteImageSource(media.mediaRef),
      deleteFromModes(media.key, media.settings),
    ]);

    if (deleteData.ok && deleteSource.ok && deleteModeData.ok) {
      return NextResponse.json({ message: "Data updated successfully" });
    } else {
      throw new Error("Failed to delete image data or source");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete data" },
      { status: 500 },
    );
  }
}

const deleteImageSource = async (mediaRef: string) => {
  const desertRef = ref(storage, `images/${mediaRef}`);
  try {
    await deleteObject(desertRef);
    return { ok: true };
  } catch (error) {
    console.error("Error deleting image source:", error);
    return { ok: false };
  }
};

const deleteImgData = async (key: string) => {
  try {
    await deleteDoc(doc(db, "media", key));
    return { ok: true };
  } catch (error) {
    console.error("Error deleting image data:", error);
    return { ok: false };
  }
};

const deleteFromModes = async (key: string, settings: Settings) => {
  const settingsRef = doc(db, "settings", "general");

  try {
    if (settings.multiMediaStore.includes(key)) {
      const updatedMultiMediaStore = settings.multiMediaStore.filter(
        (item) => item !== key,
      );
      await updateDoc(settingsRef, { multiMediaStore: updatedMultiMediaStore });
    }

    if (settings.singleMediaStore === key) {
      const newSingleMediaStore =
        settings.multiMediaStore.length > 0 ? settings.multiMediaStore[0] : "";
      await updateDoc(settingsRef, { singleMediaStore: newSingleMediaStore });
    }

    console.log("Data updated successfully");
    return { ok: true };
  } catch (error) {
    console.error("Error updating data:", error);
    return { ok: false };
  }
};
