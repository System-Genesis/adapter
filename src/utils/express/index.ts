/* eslint-disable import/prefer-default-export */
import { Response, Request, NextFunction } from 'express';

export const wrapController = (func: (req: Request<any, unknown, unknown, any>, res: Response, next?: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
};
