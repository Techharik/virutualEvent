export class AppError extends Error {
    constructor(public message: string, public statusCode: number, public isOptional = true) {
        super(message)
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFountError extends AppError {
    constructor(message = 'Resource Not Found', statusCode = 404) {
        super(message, statusCode)
    }
}
export class ValidationError extends AppError {
    constructor(message = 'Validation Failed', statusCode = 400) {
        super(message, statusCode)
    }
}
export class ConflictError extends AppError {
    constructor(message = 'Resource Already Exists', statusCode = 409) {
        super(message, statusCode)
    }
}