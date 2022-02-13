/* eslint-disable max-classes-per-file */
import * as express from 'express';
import axios, { AxiosError } from 'axios';

export class ServiceError extends Error {
    public code;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.name = 'Service Error';
    }
}

export class UnauthorizedError extends Error {
    public code;

    constructor() {
        super('Unauthorized');
        this.code = 401;
        this.name = 'Unauthorized Error';
    }
}

export class ForbiddenError extends Error {
    public code;

    constructor() {
        super('Forbidden');
        this.code = 403;
        this.name = 'Forbidden Error';
    }
}

// TODO: you have middleware.ts and also error.ts and then function called errorMiddleware, not sure what to do instead but let`s think.
export const errorMiddleware = (error: Error | AxiosError, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: error.name,
            code: 400,
            message: error.message,
        });
    } else if (error instanceof ServiceError || error instanceof UnauthorizedError || error instanceof ForbiddenError) {
        res.status(error.code).send({
            type: error.name,
            code: error.code,
            message: error.message,
        });
        // TODO: cool
    } else if (axios.isAxiosError(error)) {
        const code = error.response?.data.status || error.response?.status || 500;
        res.status(code).send({
            type: error.name,
            code,
            message: error.response?.data.message || error.response?.statusText || error.message,
        });
    } else {
        res.status(500).send({
            type: error.name,
            code: 500,
            message: error.message,
        });
    }

    next();
};
