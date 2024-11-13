import { browser } from '$app/environment';
import modal from '$lib/wallet-modal';
import { readable } from 'svelte/store';

export interface WalletState {
	isConnected: boolean;
}

const wallet = readable<WalletState>(
	{
		isConnected: false
	},
	(set) => {
		if (browser) {
			const walletId = localStorage.getItem('@appkit/wallet_id');
			set({ isConnected: !!walletId });
		}

		modal.subscribeAccount((account) => {
			set({ isConnected: account.isConnected });
		});
	}
);

export default wallet;
