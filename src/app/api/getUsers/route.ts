import { NextRequest, NextResponse } from "next/server";
// import { User } from "../../../../UserModel/User";
import { connect } from "../../../../database/mongo.config";
import { PublicModel } from "../../../../PublicModel/PublicModel";

connect();
export async function GET(request: NextRequest) {
  try {
    const page: number = parseInt(request.nextUrl.searchParams.get("page") ?? "1", 1);
    const limit: number = parseInt(
      request.nextUrl.searchParams.get("limit") ?? "10",
      10
    );
    const pageNumber = isNaN(page) ? 1 : page;
    const limitNumber = isNaN(limit) ? 10 : limit;

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      console.log("Invalid page or limit parameter");
      throw new Error("Invalid page or limit parameter");
    }

    const skip = (pageNumber - 1) * limitNumber;
    const users = await PublicModel.find().skip(skip).limit(limitNumber);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        errors: { password: error.message || "Internal Server Error" },
      },
      {
        status: 500,
      }
    );
  }
}
