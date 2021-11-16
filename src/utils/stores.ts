import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type { Auth0Client } from '@auth0/auth0-spa-js';

export const headerHeight = writable(0);

export const isAuthenticated = writable(false);
export const user: Writable<Auth0Client | {}> = writable({});
export const popupOpen = writable(false);
export const error = writable();
