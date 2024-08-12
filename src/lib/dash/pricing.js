const oracleTierPrices = {
  develop: 9.95,
  startup: 24.95,
  business: 49.95,
};

const syncComputePrice = 49.95;

export const getSyncPrice = (frequency, storage, duration) => {
  const computePrice = syncComputePrice / frequency;
  const storagePrice = 12 * storage;
  return Math.round(duration * (storagePrice + computePrice) * 100) / 100;
};

export const getAnalyticsPrice = (duration) =>
  Math.round(duration * 19.95 * 100) / 100;

export const getReverseAPIPrice = (duration, requests) => {
  return Math.round((duration * 49.95 + (requests * 49.95) / 1e6) * 100) / 100;
};

export const getOraclePrice = (tier, calls, duration) => {
  const unitPrice = oracleTierPrices[tier];
  return Math.round((duration * unitPrice + (calls * 2) / 10000) * 100) / 100;
};

export const getGraphQLPrice = (requests) =>
  Math.round((requests / 1e6) * 149.95 * 100) / 100;
