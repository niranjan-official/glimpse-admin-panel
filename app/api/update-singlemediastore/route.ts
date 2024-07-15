import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const image = await req.json();

  const settingsRef = doc(db, "settings", "general");
  await updateDoc(settingsRef, {
    singleMediaStore: image
  });

  return NextResponse.json({ message: "Mode updated successfully" });
}
