export const withDecimals = (n, k) => {
  const [lhs, rhs = ""] = n.split(".");
  return [lhs, rhs.slice(0, k)].filter(Boolean).join(".");
};
