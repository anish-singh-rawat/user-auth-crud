import mongoose from "mongoose";

export const connect = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.HOLDER_NAME}:${process.env.ACCOUNT_PASSWORD}@cluster0.mlx3w88.mongodb.net/`,{
            tls: true,
        })
        console.log('Successfully connected');
    } catch (error) {
        console.log("Internal error while connecting with MongoDB : ", error);
        
    }
}