import mongoose, { model } from 'mongoose';
import { Robot, robotSchema } from '../entities/robot.js';
import { Repo, id } from '../repositories/repo.js';

export class RobotRepository implements Repo<Robot> {
    #Model = model('Robot', robotSchema, 'robots');

    async getAll(): Promise<Array<Robot>> {
        return this.#Model.find();
        // .populate('owner', {
        //     name: 1,
        //     id: 0,
        // });
    }
    async get(id: id): Promise<Robot> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('id Not found');
        return result as Robot;
    }
    async find(search: {
        [key: string]: string | number | Date;
    }): Promise<Robot> {
        console.log({ search });
        const result = await this.#Model.findOne(search); //as Robot;
        if (!result) throw new Error('id Not found');
        return result as unknown as Robot;
    }
    async post(data: Partial<Robot>): Promise<Robot> {
        const result = await this.#Model.create(data);
        return result as Robot;
    }
    async patch(id: id, data: Partial<Robot>): Promise<Robot> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('id Not found');
        return result as Robot;
    }
    async delete(id: id): Promise<id> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('id Not found');
        return id;
    }
    disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
