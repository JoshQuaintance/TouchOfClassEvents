import { writable } from 'svelte/store';

export const openModal = writable(false);
export const dialogUsed = writable('TestDialog');
export const hintText = writable('');
