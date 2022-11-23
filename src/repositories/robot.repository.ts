import mongoose, { Types } from 'mongoose';
import { Robot, RobotI } from '../entities/robot.js';
import { Repo, id } from '../repositories/repo.js';
import createDebug from 'debug';

const debug = createDebug('W8:repositories:user');

export class RobotRepository implements Repo<RobotI> {
    static instance: RobotRepository;

    public static getInstance(): RobotRepository {
        if (!RobotRepository.instance) {
            RobotRepository.instance = new RobotRepository();
        }
        return RobotRepository.instance;
    }

    #Model = Robot;
    private constructor() {
        debug('instance');
    }

    async getAll(): Promise<Array<RobotI>> {
        debug('getAll');
        return this.#Model.find().populate('owner', {
            robots: 0,
        });
    }
    async get(id: id): Promise<RobotI> {
        debug('get', id);
        const result = await this.#Model
            .findById(id)
            .populate<{ _id: Types.ObjectId }>('owner', {
                robots: 0,
            });
        if (!result) throw new Error('id Not found');
        return result as RobotI;
    }
    async find(search: {
        //recuerda este date, tu lo tienes como string
        [key: string]: string | number | Date;
    }): Promise<RobotI> {
        debug('find', { search });
        const result = await this.#Model.findOne(search).populate('owner', {
            robots: 0,
        }); //as Robot;
        if (!result) throw new Error('id Not found');
        return result as unknown as RobotI;
    }
    async post(data: Partial<RobotI>): Promise<RobotI> {
        debug('post', data);

        const result = await (
            await this.#Model.create(data)
        ).populate('owner', {
            robots: 0,
        });
        return result as RobotI;
    }
    async patch(id: id, data: Partial<RobotI>): Promise<RobotI> {
        debug('patch', id);
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('owner', {
                robots: 0,
            });

        if (!result) throw new Error('id Not found');
        return result as RobotI;
    }
    async delete(id: id): Promise<id> {
        debug('delete', id);
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                robots: 0,
            });

        if (result === null) throw new Error('id Not found');
        return id;
    }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
