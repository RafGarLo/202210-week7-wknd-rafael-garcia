import { Router } from 'express';
import { RobotController } from '../controller/robot.js';
import { RobotRepository } from '../data/robot.repository.js';

export const robotRouter = Router();


const controller = new RobotController(new RobotRepository());


robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.get('/:id', controller.get.bind(controller));
robotRouter.post('/', controller.post.bind(controller));
robotRouter.patch('/:id', controller.patch.bind(controller));
robotRouter.delete('/:id', controller.delete.bind(controller));
