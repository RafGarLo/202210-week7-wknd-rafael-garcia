import {
    createToken,
    getSecret,
    passwdEncrypt,
    passwdValidate,
    readToken,
} from './auth';
import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import { SECRET } from '../config.js';
// Para mockear el SECRET
import * as config from '../config.js';
jest.mock('../config.js', () => ({
    SECRET: 'fjksdjksfjk',
}));

const mock = {
    id: '1',
    name: 'Pepe',
    role: '',
};

describe('Given getSecret', () => {
    describe('When it is not string', () => {
        test('Then an error should be throw', () => {
            expect(() => {
                getSecret('');
            }).toThrowError();
        });
    });
});

describe('Given "createToken, when it is called" ', () => {
    test('Then the token is created', () => {
        const signSpy = jest.spyOn(jwt, 'sign');
        const r = createToken(mock);
        expect(typeof r).toBe('string');
        expect(signSpy).toHaveBeenCalledWith(mock, SECRET);
    });
});

describe('Given "readToken"', () => {
    describe('When token is valid', () => {
        const token = createToken(mock);
        test('Then', () => {
            const r = readToken(token);
            expect(r.name).toEqual(mock.name);
        });
    });

    describe('When token is NOT valid', () => {
        // jwt.sign return a string
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2Njg3NzMwNTB9.DGdcCXGRUS4SaCMyY5RSy-8v9tylvmV_HE1rQJGYJ_5';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });

    describe('When token is bad formatted', () => {
        // jwt.sign throw an error
        const token = 'soy un token';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });
});

describe('Given "passwdEncrypt" & passwdValidate', () => {
    const spyBcHash = jest.spyOn(bc, 'hash');
    const spyBcCompare = jest.spyOn(bc, 'compare');
    describe('When we call passwdEncrypt', () => {
        test('Bcrypt.hash should be call', async () => {
            await passwdEncrypt('12345');
            expect(spyBcHash).toHaveBeenCalled();
        });
    });
    describe(`Whe we call passwdValidate also
                and The passwd and its encryption are compared`, () => {
        let hash: string;
        const passwd = '12345';
        const badPasswd = '00000';

        beforeEach(async () => {
            hash = await passwdEncrypt(passwd);
        });

        test('Then a valid password should be detected', async () => {
            const result = await passwdValidate(passwd, hash);
            expect(spyBcCompare).toHaveBeenCalled();
            expect(result).toBe(true);
        });
        test('Then a valid password should be detected', async () => {
            const result = await passwdValidate(badPasswd, hash);
            expect(spyBcCompare).toHaveBeenCalled();
            expect(result).toBe(false);
        });
    });
});
