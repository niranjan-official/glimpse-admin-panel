import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const value = await req.json();
  const interval = parseInt(value,10);

  const settingsRef = doc(db, "settings", "general");
  await updateDoc(settingsRef, {
    carouselInterval: interval,
  });

  return NextResponse.json({ message: "Mode updated successfully" });
}
