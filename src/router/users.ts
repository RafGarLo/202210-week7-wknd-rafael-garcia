import { Router } from 'express';
import { UserController } from '../controller/user.js';
import { UserRepository } from '../repositories/user.js';

export const usersRouter = Router();

const controller = new UserController(new UserRepository());

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
