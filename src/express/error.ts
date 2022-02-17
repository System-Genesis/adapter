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

export const errorHandler = (
    error: (Error & { code: number }) | (AxiosError & { code: number }),
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const type: string = error.name;
    let code = error.code || 500;
    let { message } = error;

    if (error.name === 'ValidationError') {
        code = 400;
    } else if (axios.isAxiosError(error)) {
        code = error.response?.data.status || error.response?.status || 500;
        message = error.response?.data.message || error.response?.statusText || error.message;
    }

    res.status(code).send({ type, code, message });
    next();
};
