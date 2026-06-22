import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(process.env.URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
