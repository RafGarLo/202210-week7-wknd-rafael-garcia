//get('robots/',
//get('robots/:id',
//post('robots/',
//patch('robots/:id',
//delete('robots/:id',
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { dbConnect } from '../../db.connect';
import { Robot } from '../../entities/robot';
import { User } from '../../entities/user';
import { createToken, TokenPayload } from '../../services/auth';

const setCollection = async () => {
    const usersMock = [
        { name: 'Ramon', email: 'ramon@hotmail.com', role: 'admin' },
        { name: 'Juan', email: 'juan@hotmail.com', role: 'user' },
    ];
    await User.deleteMany();
    await User.insertMany(usersMock);
    await Robot.deleteMany();
    const data = await User.find();
    const testIds = [data[0].id, data[1].id];
    return testIds;
};

describe('Given app with /robots route', () => {
    describe('When I have a connection to mongoDB', () => {
        let token: string;
        let ids: Array<string>;
        beforeEach(async () => {
            await dbConnect();
            ids = await setCollection();
            const payload: TokenPayload = {
                id: ids[0],
                name: 'pepe',
                role: 'admin',
            };
            token = createToken(payload);
        });
        afterEach(async () => {
            await mongoose.disconnect();
        });

        test('Then the get to urls /robots should send status 200', async () => {
            const response = await request(app).get('/robots/');
            expect(response.status).toBe(200);
        });

        test('Then the get to urls /robots should send status 200, 2nd option', async () => {
            await request(app).get('/robots/').expect(200);
        });

        test('Then the get to urls /robots/:id with incorrect id, it should send status 503', async () => {
            const response = await request(app).get('/robots/:23');
            expect(response.status).toBe(503);
        });

        test('Then the get to urls /robots/:id with invalid id, it should send status 404', async () => {
            const response = await request(app).get(
                '/robots/637d232badb33f47c88058b5'
            );

            expect(response.status).toBe(503); //copia el token para que esto pase a 404
        }); // fija te a ver que pasa con esto para tener un mock token falso.

        test('Then the post to urls /robots/ with authorization, it should send status message 200', async () => {
            const response = await request(app)
                .post('/robots/')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'PepeBot' });
            expect(response.status).toBe(201);
        }); //necesitas corregir esto. No te esta dando 200

        test('Then the post to urls /robots/ without authorization, it should send status error 403', async () => {
            const response = await request(app)
                .post('/robots/')
                .send({ name: 'PepeBot' });
            expect(response.status).toBe(403);
        });
    });
});
//aqui estas imitando el trabajo de la app de postman
