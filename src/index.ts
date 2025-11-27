import express, { NextFunction, type Request, type Response } from "express";
import 'dotenv/config'
import { NODE_ENV } from "./config/config";
import winston from 'winston';
import { errorHandler } from "./middlewares/error";
import cors from "cors";
import { requestLogger } from "./middlewares/logger";
import userRoutes from './routes/userRoutes'
import eventRoutes from './routes/EventRoutes'

export const app = express();



//middlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(requestLogger)

//routes
app.use("/api/v1/user/", userRoutes)
app.use("/api/v1/events/", eventRoutes)


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Event Management API"
    })
})

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
    });
});


//global Error Handler
app.use(errorHandler);




