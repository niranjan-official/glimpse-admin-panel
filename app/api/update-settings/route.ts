import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const value = await req.json();
  
  const data = value.data;
  const fieldName = value.fieldName;

  const settingsRef = doc(db, "settings", "general");
  await updateDoc(settingsRef, {
    [fieldName]: data,
  });

  return NextResponse.json({ message: "Data updated successfully" });
}
