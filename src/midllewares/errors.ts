import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/error.js';

export const errorManager = (
    error: CustomError,
    _req: Request,
    resp: Response,
    _next: NextFunction
) => {
    _next;
    console.log(
        error.name,
        error.statusCode,
        error.statusMessage,
        error.message
    );
    let status = error.statusCode || 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };

    resp.status(status).json(result).end();
};
