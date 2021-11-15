import mongodb from 'mongodb';
import mongoose from 'mongoose';

export function connectDb(): typeof mongoose {
    mongoose.connect(import.meta.env.VITE_SECRET_MONGO_URI as string);

    return mongoose;
}
