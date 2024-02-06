import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database/mongo.config";
import { Admin } from "../../../../../adminModel/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connect();
const KEY = "anishsinghrawat"
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // Blank data
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        errors: {
        message: "blank email or password. Please provide both email and password fields.",
        },
      });
    }
    const existUser = await Admin.findOne({ email });
    // User exist
    if (existUser) {
      const existUserPassword = existUser.password;
      // Password checking for login
      if (password === existUserPassword) {
        const authToken = jwt.sign(
          {existUser : existUser},
          KEY
        );
        cookies().set("authToken", authToken)
        return NextResponse.json({
          status: 201,
          token: authToken,
          message: {
            message: "User Login Successfully",
          },
        });
      } 
      else {
        // Password incorrect
        return NextResponse.json({
          status: 401,
          errors: {
            message: "Password incorrect",
          },
        });
      }
    } 
    // User does not exist
    else {
      return NextResponse.json({
        status: 400,
        errors: {
          message: "User doesn't exit. Please register first.",
        },
      });
    }
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({ message: `Error: ${error}`}, { status: 500 });
  }
}
