import mongoose from "mongoose";
import { USER, CLUSTER, PASSWORD } from './config.js';

export function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'Robots' : 'CodersTesting';
    let uri = `mongodb+srv://${USER}${PASSWORD}`;
    uri += `${CLUSTER}${DBName}?retryWrites=true&w=majority`;
    
    return mongoose.connect(uri);
}
