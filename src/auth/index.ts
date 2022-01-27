import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const { publicKey, clientNames } = config.spike;

export const checkAuthentication = (token): boolean => {
    try {
        return !!jwt.verify(token, publicKey);
    } catch (error) {
        return false;
    }
};

export const decodeJwt = (token): JwtPayload | string | null => {
    return jwt.decode(token);
};

export const checkAuthorization = (token): boolean => {
    try {
        const decodeToken = decodeJwt(token);
        return !!clientNames?.includes((decodeToken as JwtPayload).clientName);
    } catch (error) {
        return false;
    }
};
