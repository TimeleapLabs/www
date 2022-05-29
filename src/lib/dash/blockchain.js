const blockTimes = {
  "binance-testnet": 3,
  "binance-mainnet": 3,
  "fantom-testnet": 1,
  "fantom-mainnet": 1,
  "avalanche-fuji": 3,
  "avalanche-mainnet": 3,
  "polygon-mumbai": 2,
  "polygon-mainnet": 2,
};

const allStepOptions = [
  ...new Array(4).fill().map((_, i) => ({
    value: (i + 1) * 6,
    label: `${(i + 1) * 6} blocks at once`,
  })),
  ...new Array(8).fill().map((_, i) => ({
    value: (i + 1) * 12 + 30,
    label: `${(i + 1) * 12 + 30} blocks at once`,
  })),
  ...new Array(4).fill().map((_, i) => ({
    value: (i + 1) * 24 + 126,
    label: `${(i + 1) * 24 + 126} blocks at once`,
  })),
  ...new Array(8).fill().map((_, i) => ({
    value: (i + 1) * 36 + 222,
    label: `${(i + 1) * 36 + 222} blocks at once`,
  })),
];

export const getStepOptions = (chain, interval) => {
  if (!chain || !interval) {
    return allStepOptions;
  }
  const blockTime = blockTimes[chain];
  const minBlocks = (interval / blockTime) * 1.5;
  const maxBlocks = minBlocks * (minBlocks < 10 ? 5 : 3);
  return allStepOptions
    .filter((option) => option.value > minBlocks)
    .filter((option) => option.value <= maxBlocks);
};

const allTimeouts = [
  { label: "After 5 seconds", value: 5000 },
  { label: "After 10 seconds", value: 10000 },
  { label: "After 15 seconds", value: 15000 },
  { label: "After 20 seconds", value: 20000 },
  { label: "After 30 seconds", value: 30000 },
  { label: "After 60 seconds", value: 60000 },
];

export const getTimeoutOptions = (step) => {
  if (!step) {
    return allTimeouts;
  }
  return allTimeouts.filter((timeout) => timeout.value > step * 100);
};
