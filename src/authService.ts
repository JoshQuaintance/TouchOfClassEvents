import createAuth0Client from '@auth0/auth0-spa-js';
import { WebAuth } from 'auth0-js';
import type { Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$utils/stores';
import config from '../auth_config';

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
        domain: config.domain,
        clientID: config.clientId
    });

    return webAuth;
}

// async function loginWithPopup(client: Auth0Client) {

// }

async function loginWithGoogle() {
    let webAuth = await createWebClient();

    webAuth.popup.authorize(
        //@ts-ignore
        {
            // clientId: config.clientId,
            // domain: config.domain,
            redirectUri: 'http://localhost:3000/sign-up/checkout-auth',
            responseType: 'token id_token',
            connection: 'google-oauth2'
        },
        (err, authResult) => {
            if (err) alert(JSON.stringify(err));
            debugger;
            let token = authResult.accessToken;
            alert(token);
        }
    );
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
    loginWithGoogle,
    logout
    // createClient,
    // loginWithPopup,
    // logout
};

export default auth;
