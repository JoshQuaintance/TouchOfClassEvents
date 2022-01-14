import { connectToDB } from '$utils/db';
import bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import { generateJWT } from '$auth-utils';

export async function post(req) {
    const { mongoose, schemas } = await connectToDB();
    const { UserSchema } = await schemas;

    const { email, nickname, password } = JSON.parse(req.body);
    const User = mongoose.models.Users || mongoose.model('Users', UserSchema);

    const userData = await User.findOne({ email });

    if (!userData)
        return {
            status: 404,
            body: {
                code: 'user-not-found'
            }
        };

    const validatePass = await bcrypt.compare(password, userData.password);

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
        nickname,
        uid: userData.uid
    };

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
