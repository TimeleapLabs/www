import walletConnectModule from '@web3-onboard/walletconnect';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public';

const walletConnectProjectId = PUBLIC_REOWN_PROJECT_ID;

const appName = 'Timeleap';

const injected = injectedModule();
const walletConnect = walletConnectModule({
	projectId: walletConnectProjectId,
	requiredChains: [0xa4b1],
	dappUrl: 'https://timeleap.swiss/'
});

const options = {
	appMetadata: {
		name: appName,
		description: 'Timeleap dApp',
		icon: 'images/tl-white.svg'
	},
	accountCenter: {
		desktop: {
			enabled: false
		},
		mobile: {
			enabled: false
		}
	},
	chains: [
		{
			id: '0xa4b1',
			token: 'ETH',
			label: 'Arbitrum One',
			rpcUrl: 'https://arbitrum.blockpi.network/v1/rpc/public'
		},
		{
			id: '0x157b',
			token: 'TLP',
			label: 'Timeleap Devnet',
			rpcUrl: 'https://devnet.timeleap.swiss/rpc'
		}
	],
	wallets: [walletConnect, injected]
};

export const onboard = Onboard(options);
