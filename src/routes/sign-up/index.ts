/**
 * File Location: src/routes/sign-up/index.ts
 * Description: Endpoint for user signup
 */

import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import bcrypt from 'bcryptjs';
import type uuid_T from 'uuid';
import type crypto_T from 'crypto';

import { connectToDB } from '$utils/db';
import * as cookie from 'cookie';
import { generateJWT } from '$auth-utils';

export async function post(req: ServerRequest<Record<string, any>, DefaultBody>) {
    /**
     *  We dynamically import these modules here so that
     * it doesn't leak to the other functions that
     * are being used client side because it might cause some issues
     * being used client side
     */
    const uuid: typeof uuid_T = await import('uuid');
    const crypto: typeof crypto_T = await import('crypto');

    const { v4: uuidv4 } = uuid;
    const { mongoose, schemas } = await connectToDB();
    const { UserSchema } = await schemas;

    const body = JSON.parse(req.body as string);
    const { email, nickname, password } = body;

    try {
        // Hash password using 12 rounds of salt
        const hashedPassword = await bcrypt.hash(password, 12);

        const User = mongoose.models.User || mongoose.model('Users', UserSchema);
        const uid = uuidv4();

        const newUser = new User({
            uid,
            email: email,
            nickname,
            password: hashedPassword
        });

        await newUser.save((err: any) => {
            if (err)
                throw {
                    status: 500,
                    message: 'Error saving new user credentials',
                    err
                };
        });

        const payload = {
            email,
            nickname,
            uid
        };

        // Make header to set a cookie (which is going to be jwt)
        const headers = {
            'Set-Cookie': cookie.serialize('jwt', await generateJWT(payload), {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                expires: new Date('Fri, 31 Dec 9999 12:00:00 GMT')
            })
        };

        return {
            status: 201,
            headers,
            body: {
                message: 'Successfully created a new user',
                code: 'user-created'
            }
        };
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
