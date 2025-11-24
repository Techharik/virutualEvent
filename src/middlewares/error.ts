import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error("unexpected error", err)

    res.status(500).json({
        success: 'false',
        messsage: err.message || 'Internal Server Error'
    })
}