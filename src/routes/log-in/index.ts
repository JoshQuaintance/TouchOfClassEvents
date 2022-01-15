/**
 * File Location: 'routes/log-in/index.ts'
 * Description: Endpoint for user log-in information
 */

import { connectToDB } from '$utils/db';
import bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import { generateJWT } from '$auth-utils';

export async function post(req) {
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

    //Checks if the encrypted password matches what is in the database
    let validatePass = userData.noPass && (await bcrypt.compare('only-linked-with-google', userData.password));

    // if validatePass is nullish, then check the actual password
    validatePass ||= await bcrypt.compare(password, userData.password);

    if (!validatePass) {
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
        uid: userData.uid
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
        status: 200,
        headers,
        body: {
            message: 'User Exist',
            code: 'user-cred-valid',
            redirect: '/'
        }
    };
}
