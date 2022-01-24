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

export const checkAuthorization = (token): boolean => {
    try {
        const decodeToken = jwt.decode(token);
        return !!clientNames?.includes((decodeToken as JwtPayload).clientName);
    } catch (error) {
        return false;
    }
};
