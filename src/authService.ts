import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$utils/stores';
import config from '../auth_config';

async function createClient() {
    let auth0Client: Auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        connection: 'google-oauth2'
    });

    return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;
