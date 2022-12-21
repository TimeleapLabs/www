const syncTierPrices = {
  startup: 49.95,
  growth: 99.95,
  business: 199.95,
  enterprise: 399.95,
};

export const getSyncPrice = (tier, duration) => {
  return Math.round(duration * syncTierPrices[tier] * 100) / 100;
};

export const getReverseAPIPrice = (duration, requests) => {
  return Math.round((duration * 24.95 + (requests * 25) / 1e6) * 100) / 100;
};

export const getOraclePrice = (calls, duration) => {
  return Math.round((duration * 49.95 + (calls * 2) / 10000) * 100) / 100;
};

export const getGraphQLPrice = (requests) =>
  Math.round((requests / 1e6) * 24.95 * 100) / 100;
