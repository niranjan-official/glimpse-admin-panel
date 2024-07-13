import DisplayBlock from "@/components/DisplayBlock";
import ModeBlock from "@/components/DisplayBlocks/ModeBlock";
import MediaList from "@/components/MediaList";
import { db } from "@/firebase/config";
import { Media, MediaObject, Settings } from "@/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
export default async function Home() {
  const [media, settings] = await Promise.all([getMedia(), getSettings()]);
  console.log(media);

  return (
    <div className="flex flex-col p-4 pb-16 pt-24 text-black">
      <div className="flex flex-wrap gap-4">
        <DisplayBlock
          header="Images"
          title="12"
          subtitle="Total images avilable"
          color="bg-primary-green"
        />
        <ModeBlock currentMode={settings?.displayMode} />
        <DisplayBlock
          header="Interval"
          title="5sec"
          subtitle="Time between slides"
          color="bg-primary-yellow"
        />
        <DisplayBlock
          header="Refresh"
          title="</>"
          subtitle="Click to refresh page"
          color="bg-primary-blue"
        />
      </div>
      <MediaList media={media} settings={settings} />
    </div>
  );
}
