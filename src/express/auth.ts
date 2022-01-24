import { NextFunction, Request, Response } from 'express';
import { checkAuthentication, checkAuthorization } from '../auth';
import { ForbiddenError, UnauthorizedError } from './error';

// eslint-disable-next-line import/prefer-default-export
export const authMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    if (!checkAuthentication(res.locals.token)) {
        throw new UnauthorizedError();
    } else if (!checkAuthorization(res.locals.token)) {
        throw new ForbiddenError();
    }
    next();
};
