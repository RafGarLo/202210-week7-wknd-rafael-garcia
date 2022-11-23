import createDebug from 'debug';
import { User } from '../entities/user.js';

import { passwdEncrypt } from '../services/auth.js';
import { BasicRepo, id } from './repo.js';
const debug = createDebug('W8:repositories:user');

export class UserRepository implements BasicRepo<User> {
    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    #Model = User;

    private constructor() {
        debug('instance');
    }

    async get(id: id): Promise<User> {
        debug('get', id);
        const result = await this.#Model.findById(id); //as User;
        if (!result) throw new Error('id Not found');
        return result as User;
    }

    async post(data: Partial<User>): Promise<User> {
        // ESTO HACE REGISTER
        debug('post', data);
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result as User;
    }

    async find(search: { [key: string]: string }): Promise<User> {
        debug('find', { search });
        const result = await this.#Model.findOne(search); //as User;
        if (!result) throw new Error('id Not found');
        return result as unknown as User;
    }
}
