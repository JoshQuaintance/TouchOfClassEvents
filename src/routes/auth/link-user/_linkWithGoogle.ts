/**
 * Location: src/routes/auth/link-user/_linkWithGoogle
 * Description: A little API that links the google user to our database
 * Note: This file is private to the world except for the actually project because it has the '_'
 */
import type { GoogleConnection } from '$utils/types';
import type mongoose_T from 'mongoose';
import type uuid_T from 'uuid';
import { google } from 'googleapis';
import { encryptData } from '../auth-utils';
import bcrypt from 'bcryptjs';

export async function linkWithGoogle(
    User: mongoose_T.Model<any, {}, {}, {}>,
    code: string,
    newAccount: boolean = false
) {
    try {
        const dev = process.env.NODE_ENV == 'development' || false;
        const googleOAuth2Client = new google.auth.OAuth2(
            dev
                ? '293400151061-ro5rj0oq8frd5p7h5urfr1lsteeohuv3.apps.googleusercontent.com'
                : '481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com',
            dev
                ? process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET_DEV']
                : process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET'],
            dev ? 'localhost:3000' : 'touch-of-class-events.vercel.app'
        );

        // Get the user's access and refresh token from the server
        const getUserLink = `https://oauth2.googleapis.com/token?code=${code}&redirect_uri=${
            dev ? 'http://localhost:3000' : 'https://touch-of-class-events.vercel.app'
        }&client_id=481928203178-8gbnbea8kad8e3rjm0l06ejafno82kl8.apps.googleusercontent.com&client_secret=${
            dev
                ? process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET_DEV']
                : process.env['VITE_SECRET_GOOGLE_OAUTH_CLIENT_SECRET']
        }&scope=&grant_type=authorization_code`;

        // google.options({ auth: googleOAuth2Client });
        // googleOAuth2Client.getToken(code).then((tokenResponse) => {
        //     console.log('tokens');
        //     console.log(tokenResponse.tokens);
        // });

        // console.log(res);
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

        if (newAccount) {
            const uuid: typeof uuid_T = await import('uuid');
            const { v4: uuidv4 } = uuid;
            const uid = uuidv4();

            // Make a set password that will be checked later if it's only linked with google
            const hashedPassword = await bcrypt.hash('only-linked-with-google', 10);

            const newUser = new User({
                uid,
                email,
                nickname: name,
                password: hashedPassword,
                connections: googleConnection,
                noPass: true
            });

            await newUser.save((err: any) => {
                if (err)
                    throw {
                        status: 500,
                        message: 'Error saving new user credentials',
                        err
                    };
            });

            return {
                status: 201,
                body: {
                    message: 'New user created and linked successfully with Google Sign-In',
                    code: 'social-link-success'
                }
            };
        }

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

        return {
            status: 500,
            body: {
                message: 'User in database is not acknowledged'
            }
        };
    } catch (e) {
        console.error(e);
        return {
            status: 500,
            body: {
                message: e.message || 'Error in server while linking to google',
                code: e.code || null,
                err: e.err
            }
        };
    }
}
