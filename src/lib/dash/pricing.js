export const getSyncPrice = (interval, timeout, step, duration) => {
  const storage = 2 + step * 0.1;
  const runs = (30 * 24 * 60 * 60) / interval;
  const ms = runs * timeout;
  return Math.round(duration * (storage + (ms / 3e10) * 100) * 100) / 100;
};

export const getReverseAPIPrice = (interval, timeout, duration) => {
  const runs = (30 * 24 * 60 * 60) / interval;
  const ms = runs * timeout;
  return Math.round(duration * ((ms / 3e10) * 100 * 1.2) * 100) / 100;
};

export const getGraphQLPrice = (requests) =>
  Math.round((requests / 1e6) * 35 * 100) / 100;
