import * as cookie from 'cookie';
import { get } from 'svelte/store';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyJWT } from '$auth-utils';
import { isSignedIn, user } from '$utils/stores';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie || '');

    interface UserData {
        nickname: string;
        email: string;
        iat: number;
    }

    request.locals.user = {};

    if (!cookies.jwt) {
        request.locals.user.isSignedIn = false;

        let response = await resolve(request);

        return {
            ...response,
            headers: {
                ...response.headers
            }
        };
    }

    // verify the jwt
    const validJWT = await verifyJWT(cookies.jwt);

    if (validJWT) {
        request.locals.user = validJWT;
        request.locals.isSignedIn = true;
        // user.set(validJWT);
    }

    const response = await resolve(request);

    return {
        ...response,
        headers: {
            ...response.headers
        }
    };
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(req) {
    const locals = req.locals;

    if (!locals.isSignedIn)
        return {
            ...req.headers,
            body: {
                ...req.body
            }
        };

    isSignedIn.set(locals.isSignedIn);
    user.set(locals.user);
}
