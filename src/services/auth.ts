import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import { SECRET } from '../config.js';

export const getSecret = (secret = SECRET) => {
    if (typeof secret !== 'string' || secret === '') {
        throw new Error('Bad Secret for token creation');
    }
    return secret;
};

type TokenPayload = {
    id: string;
    name: string;
    role: string;
};

export const createToken = (payload: TokenPayload) => {
    return jwt.sign(payload, getSecret());
};

export const readToken = (token: string) => {
    const payload = jwt.verify(token, getSecret());
    if (typeof payload === 'string') throw new Error('Token not valid');
    return payload;
};

export const passwdEncrypt = (passwd: string) => {
    return bc.hash(passwd, 10);
};

export const passwdValidate = (newPasswd: string, hash: string) => {
    return bc.compare(newPasswd, hash);
};
