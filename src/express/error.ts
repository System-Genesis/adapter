import * as express from 'express';
import axios, { AxiosError } from 'axios';

export class ServiceError extends Error {
    public code;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export const errorMiddleware = (error: Error | AxiosError, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: error.name,
            message: error.message,
        });
    } else if (error instanceof ServiceError) {
        res.status(error.code).send({
            type: error.name,
            message: error.message,
        });
    } else if (axios.isAxiosError(error)) {
        res.status(error.response?.data.status || error.response?.status || 500).send({
            type: error.name,
            message: error.response?.data.message || error.response?.statusText || error.message,
        });
    } else {
        res.status(500).send({
            type: error.name,
            message: error.message,
        });
    }

    next();
};
