import { NextResponse } from "next/server";
import { PublicModel } from "../../../../PublicModel/PublicModel";
// import { Admin } from "../../../../adminModel/User";

export async function GET() {
    try {
        const users = await PublicModel.find();
        return NextResponse.json(
            {users},
            {status: 200}
            );       
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({
            status : 500,
            errors : { password : "some error occured while trying to fetch the users " }
        },{
            status : 500
        })
    }
}
