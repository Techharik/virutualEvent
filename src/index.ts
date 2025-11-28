import express, { type Request, type Response } from "express";
import 'dotenv/config'
import { errorHandler } from "./middlewares/error";
import cors from "cors";
import { requestLogger } from "./middlewares/logger";
import userRoutes from './routes/userRoutes'
import eventRoutes from './routes/EventRoutes'
import { rateLimit } from 'express-rate-limit'

export const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
})

//middlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(limiter)
app.use(requestLogger)

//routes
app.use("/api/v1/user/", userRoutes)
app.use("/api/v1/event/", eventRoutes)


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




