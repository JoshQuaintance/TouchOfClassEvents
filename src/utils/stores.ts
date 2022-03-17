/**
 * File Location: src/utils/stores.ts
 * Description: All the svelte stores used are located here.
 *  Note: Stores are used to share data between routes
 */

import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface UserProfile {
    email: string;
    nickname: string;
    iat: number; // issued at, made by JWT
}

export const headerHeight = writable(0);
export const pageLoaded = writable(false);
export const snackbarQueueEventTarget = writable(null);
export const globalSnackbarQueue = writable([]);
export const newSnackbar = function (item) {
    globalSnackbarQueue.update((q) => [...q, item]);
};

export const isSignedIn = writable(false);
export const user: Writable<UserProfile | {}> = writable({});
export interface CustomEventInitType extends CustomEventInit {}
