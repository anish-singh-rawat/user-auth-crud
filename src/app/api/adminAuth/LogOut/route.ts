import {NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const token = cookies();
    token.delete("authToken");
    return NextResponse.json({message : "delete cookies successfully", status: 200 });
  } 
  
  catch (error: any) {
    return NextResponse.json({ status: 400 });
  }
}
