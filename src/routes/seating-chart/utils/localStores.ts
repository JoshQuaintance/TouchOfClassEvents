import { writable } from 'svelte/store';

export let openModal = writable(false);
export let dialogUsed = writable('TestDialog');