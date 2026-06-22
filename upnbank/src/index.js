import app from './app.js';
import dotenv from 'dotenv';
import {connectDB} from './config/database.js';
import mongoose from 'mongoose';
dotenv.config();
const PORT=process.env.PORT || 3000;

const startServer=async ()=>{
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();

const gracefulShutdown = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);