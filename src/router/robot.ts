import { Router } from 'express';
import { RobotController } from '../controller/robot.js';
import { RobotRepository } from '../data/robot.repository.js';
import { logged } from '../midllewares/interceptors.js';

export const robotRouter = Router();

const controller = new RobotController(new RobotRepository());

robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.get('/:id', logged, controller.get.bind(controller));
robotRouter.post('/', logged, controller.post.bind(controller));
robotRouter.patch('/:id', logged, controller.patch.bind(controller));
robotRouter.delete('/:id', logged, controller.delete.bind(controller));
