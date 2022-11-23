import { Router } from 'express';
import { UserController } from '../controller/user.js';
import { RobotRepository } from '../repositories/robot.repository.js';
import { UserRepository } from '../repositories/user.repository.js';

export const usersRouter = Router();

const controller = new UserController(
    UserRepository.getInstance(),
    RobotRepository.getInstance()
);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
