/**
 * File Location: src/utils/db.ts
 * Description: Initializes database connection and schema creations
 */

import mongoose from 'mongoose';

/**
 * This is where all the schemas for the database will
 * be initialized
 */
async function initSchemas() {
    // Checks if mongoose is connected to the db or not
    // and if it's not then do so
    if (mongoose.connection.readyState != 1) return;

    const schemas = {
        UserSchema: new mongoose.Schema({
            uid: { type: String, required: true, unique: true },
            nickname: { type: String, required: true },
            password: { type: String, required: true }
        })
    };

    return schemas;
}

export async function connectToDB() {
    if (mongoose.connection.readyState != 1) await mongoose.connect(import.meta.env.VITE_SECRET_MONGO_URI as string);

    const schemas = initSchemas();

    return {
        mongoose,
        schemas
    };
}
