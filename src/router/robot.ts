import { Router } from 'express';
import { RobotController } from '../controller/robot.js';
import { UserRepository } from '../repositories/user.repository.js';
import { logged, who } from '../midllewares/interceptors.js';
import { RobotRepository } from '../repositories/robot.repository.js';

export const robotRouter = Router();

const controller = new RobotController(
    RobotRepository.getInstance(),
    UserRepository.getInstance()
);

robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.get('/:id', controller.get.bind(controller));
robotRouter.post('/', logged, controller.post.bind(controller));
robotRouter.patch('/:id', logged, who, controller.patch.bind(controller));
robotRouter.delete('/:id', logged, who, controller.delete.bind(controller));
