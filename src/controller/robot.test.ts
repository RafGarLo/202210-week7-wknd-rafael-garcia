import { RobotRepository } from "../data/robot.repository";
import { RobotController } from "./robot";
import { NextFunction, Request, Response } from "express";
import * as repository from '../data/robot.repository';



jest.mock('../data/robot.repository');

describe('Given robotController', () => {
    RobotRepository.prototype.getAll = jest.fn().mockResolvedValue(['robotijo']);
    const repository = new RobotRepository();
    const robotController = new RobotController(repository);
    const req: Partial<Request> = {}
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    const mockData = [
        {
            id: '0',
            name: 'mock1',
        },
        {
            id: '1',
            title: 'mock2',
        },
    ];
    
    const mockError = {
        message: undefined,
        statusCode: 503,
        statusMessage: 'Service unavailable',
    };

    test('Then..getAll', async () => {
        await robotController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenLastCalledWith({ robots: ['robotijo']});
    })
    

})
