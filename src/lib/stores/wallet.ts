import type { WalletState } from '$lib/onboard';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const wallet: Writable<WalletState | null> = writable(null);
