import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { robotRouter } from './router/robot.js';
import { setCors } from './midllewares/cors.js';
import { usersRouter } from './router/users.js';
import { errorManager } from './midllewares/errors.js';

export const app = express();
app.disable('x-powered-by');
const corsOptions = {
    origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use(setCors);

app.use('/robots', robotRouter);
app.use('/users', usersRouter);

app.get('/', (_req, res) => {
    res.send('API express de Robots -> /robots').end();
});

app.use(errorManager);
