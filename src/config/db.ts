import mongoose, { connection } from "mongoose";
import { logger } from "../middlewares/logger";
import { DB_URI } from "./config";


export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("⚡ Using existing Mongo connection");
            return;
        }
        if (!DB_URI) {
            console.log('url not found');
            return
        };
        await mongoose.connect(DB_URI);
        console.log("✅ MongoDB Connected");
        logger.http('mongodb connection', { dbconnection: true })
    } catch (e) {
        console.log('connection failed')
        logger.error('DBconnection failed')
        process.exit(1);
    }
}