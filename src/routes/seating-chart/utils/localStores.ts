import { type Writable, writable } from 'svelte/store';

export const openModal = writable(false);
export const dialogUsed = writable('TestDialog');
export const dialogData: Writable<any> = writable();
export const hintText = writable('');
