import {NextResponse } from "next/server";
import { connect } from "../../../../../database/mongo.config";
import { cookies } from "next/headers";

connect();
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
