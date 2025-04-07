// customError.ts
export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; 
        Object.setPrototypeOf(this, new.target.prototype); 
    }
}

export class RepositoryError extends CustomError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode);
        this.name = "RepositoryError";
    }
}

export class ServiceError extends CustomError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode);
        this.name = "ServiceError";
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = "Resource not found", statusCode: number = 404) {
        super(message, statusCode);
        this.name = "NotFoundError";
    }
}
 