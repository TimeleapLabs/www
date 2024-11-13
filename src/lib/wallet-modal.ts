import { PUBLIC_REOWN_PROJECT_ID } from '$env/static/public';
import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, type AppKitNetwork } from '@reown/appkit/networks';

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet];

const modal = createAppKit({
	metadata: {
		name: 'Timeleap',
		description: 'Forge future with Timeleap.',
		url: 'https://timeleap.swiss',
		icons: ['https://timeleap.swiss/favicon.svg']
	},
	adapters: [new EthersAdapter()],
	networks,
	defaultNetwork: networks[0],
	projectId: PUBLIC_REOWN_PROJECT_ID,
	features: {
		analytics: true,
		email: false,
		socials: false,
		emailShowWallets: true // default to true
	}
});

export default modal;
