export default [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "shcnorrOwner",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "stakingTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyProcessed",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountZero",
    type: "error",
  },
  {
    inputs: [],
    name: "DurationZero",
    type: "error",
  },
  {
    inputs: [],
    name: "ElementAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "ElementDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "IndexOutOfBounds",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSchorrSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "InvalidSlice",
    type: "error",
  },
  {
    inputs: [],
    name: "NftNotInStake",
    type: "error",
  },
  {
    inputs: [],
    name: "NoStakeToExtend",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "Extended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "Increased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "eip712DomainHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "extendStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getStake",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "end",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "nftSum",
            type: "uint256",
          },
        ],
        internalType: "struct ProofOfStake.Stake",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValidators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
    ],
    name: "getValidators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "increaseStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nftPrices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "processed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "eip712Hash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "safeVerify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "schnorrParticipationThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "prices",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SetNftPrices.NftPrices",
        name: "prices",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "setNftPrices",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SetSchnorrThreshold.SchnorrThreshold",
        name: "threshold",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "setSchNorrParticipationThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "nfts",
        type: "uint256[]",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "end",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftSum",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrTransfer.Transfer",
        name: "txn",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrNftTransfer.Transfer",
        name: "txn",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "transferNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "to",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrTransferOwnership.TransferOwnership",
        name: "txn",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "nfts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "prices",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SetNftPrices.NftPrices",
        name: "prices",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "verifySetNftPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SetSchnorrThreshold.SchnorrThreshold",
        name: "threshold",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "verifySetSchnorrThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrTransfer.Transfer",
        name: "txn",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "verifyTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrNftTransfer.Transfer",
        name: "txn",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "rx",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "s",
            type: "uint256",
          },
        ],
        internalType: "struct SchnorrSignature.Signature",
        name: "schnorrSignature",
        type: "tuple",
      },
    ],
    name: "verifyTransferNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
