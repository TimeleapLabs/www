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
	dappUrl: 'http://localhost:5173/'
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
			id: '0x61',
			token: 'BNB',
			label: 'BNB Smart Chain Testnet',
			rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545'
		},
		{
			id: '0x38',
			token: 'BNB',
			label: 'BNB Smart Chain',
			rpcUrl: 'https://bsc-dataseed.binance.org'
		},
		{
			id: '0x13881',
			token: 'MATIC',
			label: 'Polygon Mumbai Testnet',
			rpcUrl: 'https://rpc-mumbai.maticvigil.com'
		},
		{
			id: '0x89',
			token: 'MATIC',
			label: 'Polygon Mainnet',
			rpcUrl: 'https://polygon-rpc.com'
		},
		{
			id: '0xfa2',
			token: 'FTM',
			label: 'Fantom Testnet',
			rpcUrl: 'https://rpc.testnet.fantom.network'
		},
		{
			id: '0xfa',
			token: 'FTM',
			label: 'Fantom Mainnet',
			rpcUrl: 'https://rpc.ftm.tools'
		},
		{
			id: '0xa869',
			token: 'AVAX',
			label: 'Avalanche Fuji C-Chain',
			rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
		},
		{
			id: '0xa86a',
			token: 'AVAX',
			label: 'Avalanche C-Chain',
			rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
		},
		{
			id: '0xa4b1',
			token: 'ETH',
			label: 'Arbitrum One',
			rpcUrl: 'https://arbitrum.blockpi.network/v1/rpc/public'
		},
		{
			id: '0x66eed',
			token: 'AGOR',
			label: 'Arbitrum Goerli',
			rpcUrl: 'https://arbitrum-goerli.blockpi.network/v1/rpc/public'
		},
		{
			id: '0x66eee',
			token: 'SepETH',
			label: 'Arbitrum Sepolia',
			rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public'
		},
		{
			id: '0x1',
			token: 'ETH',
			label: 'Ethereum',
			rpcUrl: 'https://eth.llamarpc.com'
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
