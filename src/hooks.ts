import * as cookie from 'cookie';
import { get } from 'svelte/store';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyJWT } from '$auth-utils';
import { isSignedIn, user } from '$utils/stores';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie || '');
    
    const loggingOut = request.path == '/sign-out';

    let additionalHeaders = {};

    if (loggingOut && cookies.jwt) {
        cookies.jwt = null;

        additionalHeaders['Set-Cookie'] = cookie.serialize('jwt', 'signed-out', {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(new Date().getTime() + 1)
        });
    }

    interface UserData {
        nickname: string;
        email: string;
        iat: number;
    }

    request.locals.user = {};

    if (!cookies.jwt) {
        request.locals.isSignedIn = false;

        let response = await resolve(request);

        // console.log(response);

        return {
            ...response,
            headers: {
                ...response.headers,
                ...additionalHeaders
            }
        };
    }

    // verify the jwt
    const validJWT = await verifyJWT(cookies.jwt);
    if (validJWT) {
        request.locals.user = validJWT;
        request.locals.isSignedIn = true;
    }

    const response = await resolve(request);

    return {
        ...response,
        headers: {
            ...response.headers,
            ...additionalHeaders
        }
    };
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(req) {
    const { locals } = req;

    isSignedIn.set(locals.isSignedIn || false);
    user.set(locals.user);

    return {
        ...req.headers,
        body: {
            ...req.body
        },
        locals
    };
}
