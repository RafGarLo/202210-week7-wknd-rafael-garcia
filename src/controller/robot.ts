import { Robot } from '../entities/robot.js';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interfaces/error.js';
import { ExtraRequest } from '../midllewares/interceptors.js';
import { User } from '../entities/user.js';
import { BasicRepo, Repo } from '../repositories/repo.js';

export class RobotController {
    constructor(
        public repository: Repo<Robot>,
        public userRepo: BasicRepo<User>
    ) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            console.log('RobotController getAll');
            const robots = await this.repository.getAll();
            resp.json({ robots });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.get(req.params.id);
            resp.json({ robot });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    async post(req: ExtraRequest, resp: Response, next: NextFunction) {
        try {
            if (!req.payload) {
                throw new Error('Invalid payload');
            }

            const user = await this.userRepo.get(req.payload.id);
            req.body.owner = user.id;

            const robot = await this.repository.post(req.body);
            resp.json({ robot });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.patch(req.params.id, req.body);
            resp.json({ robot });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({ id: req.params.id });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    createHttpError(error: Error) {
        if (error.message === 'id Not Found') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
