import mongoose from "mongoose";

export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("mongodb connected");   
        })
        connection.on('disconnected', ()=>{
            console.log("mongodb DISconnected");   
        })
        connection.on('reconnected', ()=>{
            console.log("mongodb reconnected");   
        })
        connection.on('error', ()=>{
            console.log("error on connecting to mongodb");   
        })
    } catch (error) {
        console.log("error found during connection",error);
    }
}