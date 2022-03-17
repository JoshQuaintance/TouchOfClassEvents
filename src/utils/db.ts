/**
 * File Location: src/utils/db.ts
 * Description: Initializes database connection and schema creations
 */

import mongoose from 'mongoose';
import type { DatabaseUser, GoogleConnection, EventData } from '$utils/types';

/**
 * This is where all the schemas for the database will
 * be initialized.
 */
async function initSchemas() {
    // Checks if mongoose is connected to the db or not
    // and if it's not then do so
    if (mongoose.connection.readyState != 1) return;

    const UserSchema: mongoose.Schema<DatabaseUser> = new mongoose.Schema({
        uid: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        nickname: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        connections: { type: Array<GoogleConnection>(), default: [] },
        noPass: { type: Boolean },
        admin: { type: Boolean, required: false }
    });

    const EventSchema: mongoose.Schema<EventData> = new mongoose.Schema({
        event_id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        date: { type: Date, required: true },
        host: { type: String, required: true },
        details: { type: String, required: true },
        createdBy: { type: String, required: true },
        seating_chart_data: { type: [], required: true, default: [] }
    });

    return {
        UserSchema,
        EventSchema
    };
}

export async function connectToDB(): Promise<{
    mongoose: typeof mongoose;
    schemas: Promise<{ UserSchema: mongoose.Schema; EventSchema: mongoose.Schema }>;
}> {
    // Before connecting, always check if somehow the database is already connected
    if (mongoose.connection.readyState != 1) await mongoose.connect(import.meta.env['VITE_SECRET_MONGO_URI'] as string);

    const schemas = initSchemas();

    return {
        mongoose,
        schemas
    };
}

/**
 * Checks if the user exists using email and username
 * using a custom endpoint located at src/routes/auth/user-exist.ts
 *
 * ```
 * Returns codes:
 * 0: User doesn't exist,
 * 1: User exist from email,
 * 2: User exist from username
 * 3: User exists with google connection
 * ```
 *
 * Note: User exist from email code will always precede
 *      user exist form username code
 */
export function checkIfUserExist(email: string, nickname?: string): Promise<0 | 1 | 2 | 3> {
    return new Promise(async (resolve) => {
        // using http again, hitting the auth endpoint
        // specifically to check if user exist
        // endpoint src file located: src/routes/auth/user-exist.ts
        const res = await fetch('/auth/user-exist', {
            method: 'POST',
            body: JSON.stringify({
                email,
                nickname: nickname || ''
            })
        });

        const jsonRes = await res.json();

        if (jsonRes.code == 'user-not-exist') return resolve(0);
        if (jsonRes.code == 'user-email-exist') return resolve(1);
        if (jsonRes.code == 'user-nickname-exist') return resolve(2);
        if (jsonRes.code == 'user-email-exists-with-google-connection') return resolve(3);
    });
}
