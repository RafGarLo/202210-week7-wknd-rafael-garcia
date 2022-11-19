import { RobotRepository } from "../data/robot.repository";
import { RobotController } from "./robot";
import { NextFunction, Request, Response } from "express";
import * as repository from '../data/robot.repository';
import { CustomError, HTTPError } from "../interfaces/error";



jest.mock('../data/robot.repository');

const mockData = [
    {
        id: '0',
        name: 'mock1',
        speed: 5,
        endurance: 6,
        dateOfCreation: '1'
    },
    {
        id: '1',
        name: 'mock2',
        speed: 7,
        endurance: 8,
        dateOfCreation: '1'
    },
];

const mockError = {
    message: undefined,
    statusCode: 503,
    statusMessage: 'Service unavailable',
};

describe('Given robotController', () => {
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(418, 'Tea Pot', 'Ja, ja, ja');
    });
    RobotRepository.prototype.getAll = jest.fn().mockResolvedValue(['robotijo']);
    RobotRepository.prototype.get = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.patch = jest.fn().mockResolvedValue(mockData);
    RobotRepository.prototype.post = jest.fn().mockResolvedValue(mockData[0]);
    RobotRepository.prototype.delete = jest.fn().mockRejectedValue({});
    
    const repository = new RobotRepository();
    const robotController = new RobotController(repository);
    const req: Partial<Request> = {}
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    test('Then..getAll', async () => {
        await robotController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenLastCalledWith({ robots: ['robotijo']});
    })
    test('Then when getAll cannot get a response, it should return an error', async () => {
        (repository.getAll as jest.Mock).mockRejectedValue('Error');
        await robotController.getAll(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(HTTPError)
    })

    test('Then get', async () => {
        req.params = { id: '0'};
        await robotController.get(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
    });
    test('Then when get cannot receive a correct response, it should return an error', async () => {
        (repository.get as jest.Mock).mockRejectedValue('Error');
        await robotController.get(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(HTTPError)
    })
    test('Then patch should return a response with an array of mockData', async () => {
        req.body = mockData[0];
        req.params = { id: '0' };
        await robotController.patch(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData });
    });
    test('Then patch should return an error if data provided is incorrect', async () => {
        (repository.patch as jest.Mock).mockRejectedValue('Error');
        await robotController.patch(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(HTTPError)
    })
    test('Then post should return a response with an object of mockData', async () => {
        req.body = mockData[0];
        await robotController.post(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({ robot: mockData[0] });
    });
    test('Then if post cant get a response, it should return an error', async () => {
        (repository.post as jest.Mock).mockRejectedValue('Error');
        await robotController.post(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(HTTPError)
    })
    test('Then delete should return a response with an empty object', async () => {
        req.params = {id: '0'}
        await robotController.delete(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalledWith({id: req.params});
    })
    test('then delete should return an error when data provided is incorrect', async () => {
        (repository.delete as jest.Mock).mockRejectedValue('Error');
        req.params = { id: 'Peponcio' }
        await robotController.delete(
            req as Request,
            resp as Response,
            next as NextFunction
        )
        expect(error).toBeInstanceOf(Error)
        expect(error).toBeInstanceOf(HTTPError)
    })
   

})
