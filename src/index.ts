import express, { NextFunction, type Request, type Response } from "express";
import 'dotenv/config'
import { NODE_ENV } from "./config/config";
import winston from 'winston';
import { errorHandler } from "./middlewares/error";
import cors from "cors";
import { logger } from "./middlewares/logger";
import userRoutes from './routes/userRoutes'

export const app = express();



//middlware




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//routes
app.use("/api/v1", userRoutes)


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Event Management API"
    })
})

//app.routes
app.use('/api/route')

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
    });
});


//global Error Handler
app.use(errorHandler);




