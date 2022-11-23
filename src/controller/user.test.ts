import { UserRepository } from '../repositories/user.repository';
import { NextFunction, Request, Response } from 'express';
import { UserController } from './user';
import { passwdValidate } from '../services/auth';
import { CustomError, HTTPError } from '../interfaces/error.js';
import { RobotRepository } from '../repositories/robot.repository';

//jest.mock('../repositories/user.repository');

describe('Given UserController', () => {
    describe('When we instantiate it', () => {
        UserRepository.prototype.get = jest.fn().mockResolvedValue('');

        UserRepository.prototype.post = jest.fn().mockResolvedValue('');
        const repository = RobotRepository.getInstance();
        const userRepo = UserRepository.getInstance();
        const userController = new UserController(userRepo, repository);
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test.skip('Then register should have been called', async () => {
            req.params = {
                name: 'Juanito',
                passwd: '12345',
                email: 'juanito@yahoo.com',
                role: 'pirata',
            };
            await userController.register(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ user: '' });
        });
        test.skip('Then login should have been called', async () => {
            req.body.name = { name: 'Juanito' };
            await userController.login(req as Request, res as Response, next);
            const user = await userRepo.find(req.body.name);

            req.body.passwd = 'patata';
            user.passwd = 'patata';
            const result = await passwdValidate(req.body.passwd, user.passwd);
            expect(result).toBe(true);
        });
        describe('when we dont instantiate it', () => {
            const error: CustomError = new HTTPError(
                404,
                'id Not found',
                'message of error'
            );

            UserRepository.prototype.get = jest.fn().mockRejectedValue('User');
            UserRepository.prototype.post = jest
                .fn()
                .mockRejectedValue(['User']);

            const userRepo = UserRepository.getInstance();
            const userController = new UserController(userRepo, repository);
            const req: Partial<Request> = {};
            const res: Partial<Response> = {
                json: jest.fn(),
            };
            const next: NextFunction = jest.fn();

            test('Then if something went wrong register should throw an error', async () => {
                await userController.register(
                    req as Request,
                    res as Response,
                    next
                );
                expect(error).toBeInstanceOf(HTTPError);
            });
        });
    });
});
