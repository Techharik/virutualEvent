import express, { NextFunction, type Request, type Response } from "express";
import 'dotenv/config'
import { logger } from "./middlewares/logger";
import { NODE_ENV } from "./config/config";
import winston from 'winston';
import { errorHandler } from "./utils/errorHandler";

export const app = express();

//middlware

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}




//routes
app.use("/api/v1",)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Event Mangement API"
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




