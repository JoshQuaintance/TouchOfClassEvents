/**
 * File Location: src/routes/auth/link-user.ts'
 * Description: Links a social provider to an existing user
 */
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

import { connectToDB } from '$utils/db';
import { google } from 'googleapis';
import crypto from 'crypto';
import type { GoogleConnection } from '$utils/types';

async function encryptData(data) {
    return crypto.publicEncrypt(
        {
            key: Buffer.from(process.env['VITE_SECRET_PUBLIC_RSA_KEY'], 'base64').toString(),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            // @ts-ignore
            oeapHash: 'sha256'
        },
        Buffer.from(data)
    );
}

async function linkWithGoogle(User, code) {
    const googleOAuth2Client = new google.auth.OAuth2(
        process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_ID'] as string,
        process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET'] as string,
        'localhost:3000'
    );

    const res = await fetch(
        `https://oauth2.googleapis.com/token?code=${code}&redirect_uri=http://localhost:3000&client_id=${process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_ID']}&client_secret=${process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET']}&scope=&grant_type=authorization_code`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    );

    const { access_token, refresh_token } = await res.json();

    googleOAuth2Client.setCredentials({
        access_token: access_token
    });

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
