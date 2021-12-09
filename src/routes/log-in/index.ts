import { append } from 'svelte/internal';
import { connectToDB } from '$utils/db';
import type bcrypt_T from 'bcrypt';
import * as cookie from 'cookie';
import { generateJWT } from '$auth-utils';

export async function post(req) {
    const bcrypt: typeof bcrypt_T = await import('bcrypt');
    const { mongoose, schemas } = await connectToDB();
    const { UserSchema } = await schemas;

    const { email, nickname, password } = JSON.parse(req.body)
    const User = mongoose.models.Users || mongoose.model('Users', UserSchema);

    const payload = {
        email,
        nickname
    };

    const userData = await User.findOne({ email });

    if (userData) {
        const validatePass = await bcrypt.compare(password, userData.password)

        if (validatePass) {
            console.log("Valid")
        }
    }

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
        message: 'Successfully created a new user',
        code: 'user-created'
    }

}
