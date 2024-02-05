import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../UserModel/User";
import { connect } from "../../../../../database/mongo.config";

connect();
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword, contactNo,
    address, course, role} = await request.json();


    if (!name || !email || !password || !contactNo || !address || !course) {
      return NextResponse.json({
        status: 400,
        errors: {
        message: "blank email or password. Please provide both email and password fields.",
        },
      });
    }

    //*  check that the password and  confirmPassword  is same or not
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "password and confirmPassword should be same" },
        { status: 400 }
      );
    }

    //*  check that the email is already exist or not
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { status: 400, error: { email: "Email already exists" } },
        { status: 200 }
      );
    }

    //*  create a new user
    await User.create({ name, email, password ,address ,contactNo, course, role});
    return NextResponse.json(  
     { status: 201 , message: "User Create Successfully" },
      { status: 201 } );

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `error : ${error} ` }, { status: 201 });
  }
}
