/**
 * File Location: src/utils/stores.ts
 * Description: All the svelte stores used are located here.
 *  Note: Stores are used to share data between routes
 */

import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';


export const headerHeight = writable(0);
export const pageLoaded = writable(false);

export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
