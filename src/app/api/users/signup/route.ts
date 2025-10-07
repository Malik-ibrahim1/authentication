import {connectDB} from "@/app/dbConfig/dbConfig"; 
import User from "@/app/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";


connectDB();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        console.log(reqBody)

        const user = await User.findOne({email}) 

        if(user) {
            return NextResponse.json({error: "User already exists"}, 
                {status: 409});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash
        (password, salt);

        const newUser = new User ({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log("User registered successfully:", savedUser);

        // Send verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id.toString()});


        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, 
            {status: 500});
    }
    
}