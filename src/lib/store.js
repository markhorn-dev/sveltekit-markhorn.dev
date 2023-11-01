import { writable } from 'svelte/store';

const scrolled = writable(false);
const drawerOpen = writable(false);

export { scrolled, drawerOpen }