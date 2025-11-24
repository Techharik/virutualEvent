export class AppError extends Error {
    constructor(public statusCode: number, public message: string, public isOptional = true) {
        super(message)
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFountError extends AppError {
    constructor(statusCode = 404, message = 'Resource Not Found') {
        super(statusCode, message)
    }
}

export class ValidationError extends AppError {
    constructor(statusCode = 400, message = 'Validation Failed') {
        super(statusCode, message)
    }
}

export class ConflictError extends AppError {
    constructor(statusCode = 409, message = 'Resource Already Exists') {
        super(statusCode, message)
    }
}