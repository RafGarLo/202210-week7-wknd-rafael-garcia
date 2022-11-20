import mongoose, { Schema, model } from "mongoose";
import { Robot } from "../entities/robot.js";
import { Data, id } from "./data.js";

export class RobotRepository implements Data<Robot> {
    #schema = new Schema({
        name: String,
        speed: Number,
        endurance: Number,
        dateOfCreation: String,
    });

    #Model = model('Robot', this.#schema, 'robots');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        })
    }
    async getAll(): Promise<Array<Robot>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Robot> {
        const result = await this.#Model.findById(id); 
        if (!result) throw new Error('id Not found');
        return result as Robot;
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
    async delete(id: id): Promise<{ id: id }> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('id Not found');
        return { id: id };
    }
    disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }   
}
