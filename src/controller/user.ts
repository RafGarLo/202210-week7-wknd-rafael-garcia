import { NextFunction, Request, Response } from 'express';
import { Robot } from '../entities/robot.js';
import { User } from '../entities/user.js';
import { HTTPError } from '../interfaces/error.js';
import { BasicRepo, Repo } from '../repositories/repo.js';
import { createToken, passwdValidate } from '../services/auth.js';

export class UserController {
    constructor(
        public readonly repository: BasicRepo<User>,
        public readonly robotRepo: Repo<Robot>
    ) {
        //
    }

    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.post(req.body);
            resp.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.find({ name: req.body.name });
            const isPasswdValid = await passwdValidate(
                req.body.passwd,
                user.passwd
            );
            if (!isPasswdValid) throw new Error();
            const token = createToken({
                id: user.id,
                name: user.name,
                role: user.role,
            });
            resp.json({ token });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }
    #createHttpError(error: Error) {
        if ((error as Error).message === 'id Not found') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
