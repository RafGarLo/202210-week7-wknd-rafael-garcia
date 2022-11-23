import { model, Schema, Types } from 'mongoose';

export type ProtoUser = {
    name?: string;
    email?: string;
    passwd?: string;
    role?: string;
    robots?: Array<Types.ObjectId>;
};

export type User = {
    id: Types.ObjectId;
    name: string;
    email: string;
    passwd: string;
    role: string;
    robots: Array<Types.ObjectId>;
};

export const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    passwd: String,
    role: String,
    robots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Robots',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.passwd;
    },
});

export const User = model<User>('User', userSchema, 'users');
