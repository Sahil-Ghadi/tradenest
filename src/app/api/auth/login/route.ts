import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

dbConnect()

export async function POST(request: NextRequest){

    try {
        const data = await request.json() 
        const {username, password} = data

        const user:any = User.findOne({username})

        if(!user){
            return NextResponse.json({error:"user does not exist"},{status:400})
        }
        const passCheck = await bcryptjs.compare(password,user.password)
        if(!passCheck){
            return NextResponse.json({error:"invalid password"},{status:400})
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
           }
    
           //token creation
           const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})
    
           const response = NextResponse.json({
            message: "login success",
            success: true
           })
           response.cookies.set("token",token, {
            httpOnly: true,
           })
           return response;

    } catch (error:any) {
        return NextResponse.json({error:error.messsage},{status:400})
    }
}