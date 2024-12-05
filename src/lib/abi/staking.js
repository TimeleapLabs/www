export default [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'addRewards',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'bool',
						name: 'active',
						type: 'bool'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'duration',
						type: 'uint256'
					}
				],
				internalType: 'struct Storage.StakeProgram',
				name: 'value',
				type: 'tuple'
			}
		],
		name: 'addStakeProgram',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			}
		],
		name: 'deleteStakeProgram',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes'
			}
		],
		name: 'onERC721Received',
		outputs: [
			{
				internalType: 'bytes4',
				name: '',
				type: 'bytes4'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'recipient',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'recoverERC20',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'programId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'stakeTokens',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'rewardTokenAddress',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'stakeTokenAddress',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'bonusNftAddress',
				type: 'address'
			}
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'RewardsAdded',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'bool',
				name: 'status',
				type: 'bool'
			}
		],
		name: 'setEarlyUnlock',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'programId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'nftId',
				type: 'uint256'
			}
		],
		name: 'stakeTokensWithNft',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'stakeId',
				type: 'uint256'
			}
		],
		name: 'unstake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				components: [
					{
						internalType: 'bool',
						name: 'active',
						type: 'bool'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'duration',
						type: 'uint256'
					}
				],
				internalType: 'struct Storage.StakeProgram',
				name: 'value',
				type: 'tuple'
			}
		],
		name: 'updateStakeProgram',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getDatabase',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];
