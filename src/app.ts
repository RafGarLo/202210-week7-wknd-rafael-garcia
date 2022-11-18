import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { CustomError } from './interfaces/error.js';
import { robotRouter } from './router/robot.js';


export const app = express();
app.disable("x-powered-by");
const corsOptions = {
    origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.header('Origin')  || '*';
    res.setHeader('Access-Control-Allow-Origin', origin as string)
    next()
})

app.use('/robots', robotRouter);


app.get('/', (req, res) => {
    res.send('API express de products').end();
});

app.use(
    (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
        console.log(
            error.name,
            error.statusCode,
            error.statusMessage,
            error.message
        );
        //el mensaje de aqui arriba es para nuestro tecnico
        let status = error.statusCode || 500;
        if (error.name === 'Validation Error') {
            status = 406;
        }
        //el mensaje que sigue aqui abajo es el que recibe nuestro usuario.

        const result = {
            status: status,
            type: error.name,
            error: error.message,
        };
        resp.status(status).json(result).end();
    }
);
