import { Schema, model, Types } from 'mongoose';

export type ProtoRobotI = {
    name: string;
    img?: string;
    speed?: number;
    endurance?: number;
    date?: string;
    owner?: Types.ObjectId;
};

export type RobotI = {
    id: string;
    name: string;
    img: string;
    speed: number;
    endurance: number;
    dateOfCreation: string;
    owner: Types.ObjectId;
};
const robotsImagesURL = 'https://robohash.org';

export const robotSchema = new Schema<RobotI>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        set: (name: string) => `${robotsImagesURL}/${name}`,
    },

    speed: { type: Number, min: 0, max: 10 },
    endurance: { type: Number, min: 0, max: 10 },
    dateOfCreation: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

robotSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});

export const Robot = model<RobotI>('Robot', robotSchema, 'robots');
