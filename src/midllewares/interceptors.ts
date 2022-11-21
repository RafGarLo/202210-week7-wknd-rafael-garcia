import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../interfaces/error.js';
import { readToken } from '../services/auth.js';

interface ExtraRequest extends Request {
    payload: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const authString = req.get('Authorization');
    if (!authString || authString?.slice(1, 6) !== 'Bearer') {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
        return;
    }
    try {
        const token = authString.slice(7);
        req.payload = readToken(token);
        next();
    } catch (error) {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
    }
};
