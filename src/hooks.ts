import * as cookie from 'cookie';
import { verifyJWT } from '$auth-utils';
import { isSignedIn, user } from '$utils/stores';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
    const cookies = cookie.parse(request.headers.cookie || '');

    const loggingOut = (request?.url.pathname || request?.path) == '/sign-out';

    const additionalHeaders = {};

    if (loggingOut && cookies.jwt) {
        cookies.jwt = null;
        additionalHeaders['Set-Cookie'] = cookie.serialize('jwt', 'signed-out', {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(new Date().getTime() + 1)
        });
    }

    request.locals.seating_chart_data = null;
    request.locals.snackbarQueue = [];
    request.locals.user = {};

    if (!cookies.jwt) {
        request.locals.isSignedIn = false;

        const response = await resolve(request);

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
