/**
 * File Location: src/routes/auth/user-exist.ts
 * Description: Endpoint to check if a user does exists in our database
 */

import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

import { connectToDB } from '$utils/db';

export async function post(req: ServerRequest<Record<string, any>, DefaultBody>) {
    const { mongoose, schemas } = await connectToDB();
    const { UserSchema } = await schemas;
    const { email, nickname } = JSON.parse(req.body as string);

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    try {
        /** 
            Returns in this file are essentially http responses
            Responses that are not errors, are going to have codes to represent the responses
        */
        // First, check if user exist using the email given
        let userDataWithEmail = await User.findOne({ email });

        if (userDataWithEmail)
            return {
                status: 409,
                body: {
                    message: `User with email '${email}' already exists`,
                    code: 'user-email-exists'
                }
            };

        // Then use the username given to check existence
        let userDataWithNickname = await User.findOne({ nickname });

        if (userDataWithNickname)
            return {
                status: 409,
                body: {
                    message: `User with nickname '${nickname}' already exists`,
                    code: 'user-nickname-exists'
                }
            };
        else
            return {
                status: 200,
                body: {
                    message: `User with nickname '${nickname}' does not exist`,
                    code: 'user-not-exist'
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
