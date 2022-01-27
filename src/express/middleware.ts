import { NextFunction, Request, Response } from 'express';
import { objectMap } from '../utils/functionHandler';
import { checkAuthentication, checkAuthorization } from '../auth';
import { ForbiddenError, UnauthorizedError } from './error';

export const queryInsensitive = (req: Request<unknown, unknown, unknown, object>, _res, next: NextFunction) => {
    if (req.query && req.query instanceof Object)
        req.query = new Proxy(req.query, {
            get: (target: Object, name: string) => target[Object.keys(target).find((key) => key.toLowerCase() === name.toLowerCase()) as string],
        });
    next();
};

export const stringToArray = (req: Request<unknown, unknown, unknown, object>, _res, next: NextFunction) => {
    if (req.query && req.query instanceof Object)
        req.query = objectMap(req.query, (param) =>
            typeof param === 'string' && param.includes(',') ? param.split(',').map((value) => value.trim()) : param,
        );
    next();
};

export const authMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    if (!checkAuthentication(res.locals.token)) {
        throw new UnauthorizedError();
    } else if (!checkAuthorization(res.locals.token)) {
        throw new ForbiddenError();
    }
    next();
};
