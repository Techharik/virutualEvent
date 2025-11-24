import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncHandler =
    (fn: AsyncHandler) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res, next);
            } catch (err: any) {
                console.log("Error caught:", err);

                if (err instanceof AppError) {
                    return res.status(err.statusCode).json({
                        status: "error",
                        message: err.message,
                    });
                }

                if (err.name === "ValidationError") {
                    return res.status(400).json({
                        status: "fail",
                        message: "Validation failed",
                        errors: err.errors,
                    });
                }

                if (err.code === 11000) {
                    return res.status(409).json({
                        status: "fail",
                        message: "Duplicate resource",
                        field: Object.keys(err.keyValue)[0],
                        value: err.keyValue,
                    });
                }

                if (err instanceof SyntaxError) {
                    return res.status(400).json({
                        status: "fail",
                        message: "Invalid JSON payload",
                    });
                }

                next(err);
            }
        };
