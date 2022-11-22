import mongoose, { Schema } from 'mongoose';

export type ProtoRobot = {
    name: string;
    img?: string;
    speed?: number;
    endurance?: number;
    date?: string;
    owner?: typeof mongoose.Types.ObjectId;
};

export type Robot = {
    id: string;
    name: string;
    img: string;
    speed: number;
    endurance: number;
    dateOfCreation: string;
    owner: typeof mongoose.Types.ObjectId;
};
const robotsImagesURL = 'https://robohash.org';

export const robotSchema = new Schema<Robot>({
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
        type: mongoose.Types.ObjectId,
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
