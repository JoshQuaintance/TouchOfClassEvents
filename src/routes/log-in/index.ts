/**
 * File Location: 'routes/log-in/index.ts'
 * Description: Endpoint for user log-in information
 */

import { connectToDB } from '$utils/db';
import bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import { generateJWT } from '$auth-utils';

export async function post(req) {
    try {
        const { mongoose, schemas } = await connectToDB();
        const { UserSchema } = await schemas;

        const { email, password } = JSON.parse(req.body);
        const User = mongoose.models.Users || mongoose.model('Users', UserSchema);

        const userData = await User.findOne({ email });
        //Checks if the user input information for an email
        if (!userData)
            return {
                status: 404,
                body: {
                    code: 'user-not-found'
                }
            };

        console.log(req)
        //Checks if the encrypted password matches what is in the database
        const validatePass = await bcrypt.compare(password, userData.password);

        const onlyLinkedWithGoogle =
            userData.connections.length > 0 &&
            userData.connections[0].connection == 'google' &&
            userData.noPass &&
            (await bcrypt.compare('only-linked-with-google', userData.password));

        if (
            req.headers.referer.replace(req.url.origin, '') == '/log-in' &&
            password != 'only-linked-with-google' &&
            password != 'GoogleAuth' &&
            onlyLinkedWithGoogle
        ) {
            return {
                status: 400,
                body: {
                    code: 'user-only-linked-with-google'
                }
            };
        }

        if (!validatePass && !onlyLinkedWithGoogle && userData.connections.length == 0) {
            return {
                status: 403,
                body: {
                    code: 'user-cred-invalid'
                }
            };
        }

        const payload = {
            email,
            nickname: userData.nickname,
            uid: userData.uid,
            admin: userData?.admin || false
        };

        //Creates cookies on the website to keep a user logged in
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
                message: 'User Exist',
                code: 'user-cred-valid'
            }
        };
    } catch (err) {
        return {
            status: 500,
            body: {
                message: err.message || 'Server Error!',
                code: err.code
            }
        };
    }
}
