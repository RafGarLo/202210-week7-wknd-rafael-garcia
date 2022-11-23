import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../interfaces/error.js';
import { RobotRepository } from '../repositories/robot.repository.js';
import { readToken } from '../services/auth.js';
import createDebug from 'debug';

const debug = createDebug('W8:middlewares:interceptors');

export interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    debug('logged');
    const authString = req.get('Authorization');
    if (!authString || !authString?.startsWith('Bearer')) {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
        return;
    }
    try {
        const token = authString.slice(7);
        readToken(token);
        req.payload = readToken(token);
        next();
    } catch (error) {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
    }
};

export const who = async (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    //req.payload.id id del usuario segun el token
    const repo = RobotRepository.getInstance();
    try {
        const robot = await repo.get(req.params.id);
        console.log(robot);
        if (req.payload && robot.owner._id.toString() !== req.payload.id) {
            next(
                new HTTPError(
                    403,
                    'forbidden',
                    'usuario o contraseña incorrecto'
                )
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};
