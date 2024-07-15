import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data, fieldName } = await req.json();
    
    const settingsRef = doc(db, "settings", "general");
    await updateDoc(settingsRef, {
      [fieldName]: data,
    });

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ message: "Failed to update data" }, { status: 500 });
  }
}
