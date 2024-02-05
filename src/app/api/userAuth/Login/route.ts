import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../database/mongo.config";
import { User } from "../../../../../UserModel/User";


connect();
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
    const existUser = await User.findOne({ email });
    // User exist
    if (existUser) {
      const existUserPassword = existUser.password;
      // Password checking for login
      if (password === existUserPassword) {
        return NextResponse.json({
          status: 201,
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
