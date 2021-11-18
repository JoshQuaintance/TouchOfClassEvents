import createAuth0Client from '@auth0/auth0-spa-js';
import { WebAuth } from 'auth0-js';
import type { Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$utils/stores';

// async function createClient() {
//     let auth0Client: Auth0Client = await createAuth0Client({
//         domain: config.domain,
//         client_id: config.clientId,
//         // connection: 'google-oauth2'
//     });

//     return auth0Client;
// }

async function createWebClient() {
    let webAuth = new WebAuth({
        domain: import.meta.env.VITE_SECRET_AUTH0_DOMAIN as string,
        clientID: import.meta.env.VITE_SECRET_AUTH0_CLIENT_ID as string
    });

    return webAuth;
}

async function signup({ email, password, username }: { email: string; password: string; username: string }) {
    const webAuth = await createWebClient();

    webAuth.signup({
        clientId: import.meta.env.VITE_SECRET_AUTH0_CLIENT_ID as string,
        email,
        password,
        username,
        
    })
}

// async function loginWithPopup(client: Auth0Client, options?) {
//     popupOpen.set(true);
//     try {
//         await client.loginWithPopup(options);

//         user.set(await client.getUser());
//         isAuthenticated.set(true);
//     } catch (e) {
//         // eslint-disable-next-line
//         console.error(e);
//     } finally {
//         popupOpen.set(false);
//     }
// }

function logout(client) {
    return client.logout();
}

const auth = {
    createWebClient,
    logout,
    signup
    // createClient,
    // loginWithPopup,
    // logout
};

export default auth;
