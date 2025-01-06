export default [
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
				name: 'id',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'unlock',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'rewards',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'program',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'claimed',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'hasNft',
				type: 'bool'
			}
		],
		name: 'StakeCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			}
		],
		name: 'StakeDeleted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'active',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'rewards',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			}
		],
		name: 'StakeProgramCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			}
		],
		name: 'StakeProgramDeleted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'active',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'rewards',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'duration',
				type: 'uint256'
			}
		],
		name: 'StakeProgramUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'user',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'unlock',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'rewards',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'program',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'nftId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'claimed',
				type: 'bool'
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'hasNft',
				type: 'bool'
			}
		],
		name: 'StakeUpdated',
		type: 'event'
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'user',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'unlock',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'program',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'nftId',
						type: 'uint256'
					},
					{
						internalType: 'bool',
						name: 'claimed',
						type: 'bool'
					},
					{
						internalType: 'bool',
						name: 'hasNft',
						type: 'bool'
					}
				],
				internalType: 'struct Storage.Stake',
				name: 'value',
				type: 'tuple'
			}
		],
		name: 'addStake',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
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
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
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
		name: 'deleteStake',
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
				name: 'value',
				type: 'address'
			}
		],
		name: 'findStakesByUser',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
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
		name: 'getStakeById',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'user',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'unlock',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'program',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'nftId',
						type: 'uint256'
					},
					{
						internalType: 'bool',
						name: 'claimed',
						type: 'bool'
					},
					{
						internalType: 'bool',
						name: 'hasNft',
						type: 'bool'
					}
				],
				internalType: 'struct Storage.Stake',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
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
		name: 'getStakeProgramById',
		outputs: [
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
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'idList',
				type: 'uint256[]'
			}
		],
		name: 'getStakeProgramsById',
		outputs: [
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
				internalType: 'struct Storage.StakeProgram[]',
				name: '',
				type: 'tuple[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'idList',
				type: 'uint256[]'
			}
		],
		name: 'getStakesById',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'user',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'unlock',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'program',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'nftId',
						type: 'uint256'
					},
					{
						internalType: 'bool',
						name: 'claimed',
						type: 'bool'
					},
					{
						internalType: 'bool',
						name: 'hasNft',
						type: 'bool'
					}
				],
				internalType: 'struct Storage.Stake[]',
				name: '',
				type: 'tuple[]'
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
				internalType: 'uint256',
				name: 'id',
				type: 'uint256'
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'user',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'unlock',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'rewards',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'program',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'nftId',
						type: 'uint256'
					},
					{
						internalType: 'bool',
						name: 'claimed',
						type: 'bool'
					},
					{
						internalType: 'bool',
						name: 'hasNft',
						type: 'bool'
					}
				],
				internalType: 'struct Storage.Stake',
				name: 'value',
				type: 'tuple'
			}
		],
		name: 'updateStake',
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
	}
];
