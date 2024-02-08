import { NextResponse } from "next/server";
import { Admin } from "../../../../adminModel/User";
import { connect } from "../../../../database/mongo.config";

connect();
export async function PUT(request: NextResponse) {
  try {
    const { email, password, confirmPassword } = await request.json();

    if (!confirmPassword || !email || !password) {
      return NextResponse.json({
        status: 400,
        message: "blank email or password. Please provide all fields's data",
      });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "user doesn't exist",
      });
    }

    if (user) {
      if (password == confirmPassword) {
        const { _id } = user;
        await Admin.findByIdAndUpdate(_id, { password }, { new: true });
        return NextResponse.json({
          status: 200,
          message: "User updated Successfully",
        });
      }
      if (password !== confirmPassword) {
        return NextResponse.json({
          status: 202,
          message: "Password and confirm password should be same",
        });
      }
    } else {
      return NextResponse.json({
        status: 500,
        message: "Error occured, please recheck your data",
      });
    }
  } catch (error) {
    console.error(error, "dddddddddddd", { error: error });
    return NextResponse.json({ status: 500, message: "Error updating User" });
  }
}
