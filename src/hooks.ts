import * as cookie from 'cookie';
import { get } from 'svelte/store';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyJWT } from '$auth-utils';
import { isSignedIn, user } from '$utils/stores';

/** @type {import('@sveltejs/kit').GetSession} */
export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie);

    if (!cookies.jwt) isSignedIn.set(false);

    // verify the jwt
    const validJWT = await verifyJWT(cookies.jwt);

    if (validJWT) {
        user.set(validJWT);
    }

    console.log(get(user));

    const response = await resolve(request);

    return {
        ...response,
        headers: {
            ...response.headers
        }
    };
}
