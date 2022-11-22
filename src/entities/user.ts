import { Schema } from 'mongoose';

export type ProtoUser = {
    name?: string;
    email?: string;
    passwd?: string;
    role?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    passwd: string;
    role: string;
};

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    passwd: String,
    role: String,
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.passwd;
    },
});
