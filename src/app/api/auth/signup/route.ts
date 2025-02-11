import { NextResponse,NextRequest } from "next/server";
import User from "@/models/user.model";
import { dbConnect } from "@/dbConnect/dbConnect";
import bcryptjs from 'bcryptjs'

dbConnect()

export async function POST(request: NextRequest){
    try {
        const data = await request.json()
        const {email,password,role,username} = data

        const user = await User.findOne({username})
        if(user){
            return NextResponse.json({error:'user with username already exists'},{status:400}) 
        }
        const salt = await bcryptjs.genSalt(15)
        const hashPass = await bcryptjs.hash(password,salt)

        const NewUser = new User({
            username,
            email,
            password: hashPass,
            role
        })
        const saveUser = await NewUser.save()
        console.log(saveUser);
        
        return NextResponse.json({message:"user sign up success"},{status:200}) 

    } catch (error:any) {
    return NextResponse.json({error:error.message},{status:400}) 
    }
}