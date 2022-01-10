/**
 * File Location: src/routes/auth/link-user.ts'
 * Description: Links a social provider to an existing user
 */
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { GoogleConnection } from '$utils/types';
import type mongoose_T from 'mongoose';

import { connectToDB } from '$utils/db';
import { google } from 'googleapis';
import { encryptData } from '../auth-utils';

async function linkWithGoogle(User: mongoose_T.Model<any, {}, {}, {}>, code: string) {
    const googleOAuth2Client = new google.auth.OAuth2(
        '481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com',
        import.meta.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET'] as string,
        import.meta.env['VITE_ENVIRONMENT'] == 'DEV' ? 'localhost:3000' : 'touch-of-class-events.vercel.app'
    );

    // Get the user's access and refresh token from the server
    const getUserLink = `https://oauth2.googleapis.com/token?code=${code}&redirect_uri=${
        import.meta.env['VITE_ENVIRONMENT'] == 'DEV'
            ? 'http://localhost:3000'
            : 'https://touch-of-class-events.vercel.app'
    }&client_id=481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com&client_secret=${
        process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET']
    }&scope=&grant_type=authorization_code`;

    const res = await fetch(getUserLink, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });

    const { access_token, refresh_token } = await res.json();

    // Authorize our google oauth2 client with the access token
    googleOAuth2Client.setCredentials({
        access_token
    });

    // Get the user profile
    const profile = await google.oauth2('v2').userinfo.v2.me.get({ auth: googleOAuth2Client });

    const { id, email, name, picture } = profile.data;

    const googleConnection: GoogleConnection = {
        connection: 'google',
        id,
        email,
        name,
        picture,
        refresh_token: (await encryptData(refresh_token)).toString()
    };

    // Update the user
    const updateResponse = await User.updateOne({ email }, { $push: { connections: googleConnection } });

    // Acknowledged is true when the data in the db is updated
    if (updateResponse.acknowledged)
        return {
            status: 204,
            body: {
                message: `User with email ${email} linked successfully with Google Sign-In`,
                code: 'social-link-success'
            }
        };
}

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
