import {connectDB} from "@/app/dbConfig/dbConfig"; 
import User from "@/app/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connectDB()

export async function POST (request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody);

        // check if user exists
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"},
            {status: 400}
            )
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({error: "Invalid credentials"},
            {status: 400}
            )
        }

        // Create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successful",
            user: tokenData,
        })
        response.cookies.set("token", token, {httpOnly: true,}) // 1 hour
        return response

    } catch (error: unknown) {
        return NextResponse.json({error: (error as Error).message},
            {status: 500}
        
        )
    }
}
