import { Data } from "../data/data.js";
import { Robot } from "../entities/robot.js";
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from "../interfaces/error.js";


export class RobotController {
    constructor(public repository: Data<Robot>) { }

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const robots = await this.repository.getAll();
            resp.json({ robots });
        } catch (error) {
            const httpError = new HTTPError(503, 'Service Unavailable', (error as Error).message);
            next(httpError);
        }
    }
    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.get(req.params.id);
            resp.json({ robot });
        } catch (error) {
            next(this.#createHTTPError(error as Error));
        }
    }
    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.repository.post(req.body);
            resp.json(({ robot }));
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
            const robot = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json({ robot })
        } catch (error) {
            next(this.#createHTTPError(error as Error));
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({})
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
        }
    } 

    #createHTTPError (error: Error) {
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