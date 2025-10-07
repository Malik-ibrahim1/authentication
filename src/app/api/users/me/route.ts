import { getDataFromToken } from "@/app/helpers/getDataFromToken";

import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/userModel";
import { connectDB } from "@/app/dbConfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User fetched successfully",
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, 
        {status: 400})

    }
}