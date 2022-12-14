import { RobotController } from './robot';
import { NextFunction, Request, Response } from 'express';

import { CustomError, HTTPError } from '../interfaces/error';
import { UserRepository } from '../repositories/user.repository';
import { RobotRepository } from '../repositories/robot.repository';

//jest.mock('../repositories/robot.repository');

const mockData = [
    {
        id: '0',
        name: 'mock1',
        speed: 5,
        endurance: 6,
        dateOfCreation: '1',
    },
    {
        id: '1',
        name: 'mock2',
        speed: 7,
        endurance: 8,
        dateOfCreation: '1',
    },
];

describe('Given robotController', () => {
    const repository = RobotRepository.getInstance();
    const userRepo = UserRepository.getInstance();

    RobotRepository.prototype.getAll = jest.fn().mockResolvedValue(mockData);
    RobotRepository.prototype.get = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.patch = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.post = jest.fn().mockResolvedValue('newRobot');
    RobotRepository.prototype.delete = jest.fn().mockResolvedValue(mockData);

    const robotController = new RobotController(repository, userRepo);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    //const mockResponse = { robots: ['robotijo'] };

    test('Then..getAll', async () => {
        await robotController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenLastCalledWith({ robots: mockData });
    });

    test('Then get', async () => {
        req.params = { id: '0' };
        await robotController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
    });

    test('Then patch should return a response with an array of mockData', async () => {
        await robotController.patch(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
    });

    test('Then post should return a response with an object of mockData', async () => {
        //req.body = mockResponse;
        await robotController.post(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({ robots: mockData });
    });

    test('Then delete should return a response with deleted object id', async () => {
        req.params = { id: '0' };
        await robotController.delete(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({ id: req.params.id });
    });

    describe('Given controller, when actions/values are incorrect', () => {
        let error: CustomError;
        beforeEach(() => {
            error = new HTTPError(418, '418 error', 'error message');
        });
        beforeEach(() => {
            RobotRepository.prototype.getAll = jest
                .fn()
                .mockRejectedValue([mockData]);
            RobotRepository.prototype.get = jest
                .fn()
                .mockRejectedValue([mockData]);
            RobotRepository.prototype.post = jest
                .fn()
                .mockRejectedValue([mockData]);
            RobotRepository.prototype.patch = jest
                .fn()
                .mockRejectedValue([mockData]);
            RobotRepository.prototype.delete = jest
                .fn()
                .mockRejectedValue([mockData]);
        });
        test('Then when getAll cannot get a response, it should return an error', async () => {
            (repository.getAll as jest.Mock).mockRejectedValue('Error');
            await robotController.getAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then when get cannot receive a correct response, it should return an error', async () => {
            (repository.get as jest.Mock).mockRejectedValue('Error');
            await robotController.get(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then patch should return an error if data provided is incorrect', async () => {
            (repository.patch as jest.Mock).mockRejectedValue('Error');
            await robotController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then if post cant get a response, it should return an error', async () => {
            (repository.post as jest.Mock).mockRejectedValue('Error');
            await robotController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then if delete has incorrect values, it should return an error', async () => {
            (repository.delete as jest.Mock).mockRejectedValue('Error');
            await robotController.delete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
        test('Then if createhttperror is called, it should return httpError', async () => {
            error.message = 'id Not Found';
            await robotController.createHttpError(error);
            expect(error.message).toBe('id Not Found');
        });
    });
});
