import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface WalletAccount {
	address?: string;
}

export interface Wallet {
	provider?: any;
	accounts?: WalletAccount[];
	label?: string;
}

export const wallet: Writable<Wallet | null> = writable(null);
