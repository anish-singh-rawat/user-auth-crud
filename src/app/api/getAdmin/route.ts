import { NextResponse } from "next/server";
import { connect } from "../../../../database/mongo.config";
import { Admin } from "../../../../adminModel/User";

connect();
export async function GET() {
    try {
        const users = await Admin.find();
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
