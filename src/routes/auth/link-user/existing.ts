/**
 * File Location: src/routes/auth/link-user.ts'
 * Description: Links a social provider to an existing user
 */
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

import { connectToDB } from '$utils/db';
import { linkWithGoogle } from './_linkWithGoogle';

export async function post(req: ServerRequest<Record<string, any>, DefaultBody>) {
    const { mongoose, schemas } = await connectToDB();
    const { UserSchema } = await schemas;
    const { connection, code } = JSON.parse(req.body as string);

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    try {
        if (connection == 'google') {
            let response = await linkWithGoogle(User, code);

            return {
                status: response.status,
                body: response.body
            };
        }
    } catch (err) {
        return {
            status: err.status || 500,
            body: {
                message: err.message || 'Server Error',
                err: err || null
            }
        };
    }
}
