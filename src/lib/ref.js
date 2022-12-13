export const setRef = () => {
  if (typeof location === "undefined") return;
  const ref = new URLSearchParams(location.search).get("ref");
  if (!ref) return;
  localStorage.setItem("ref", ref);
};

export const getRef = () => {
  if (typeof location === "undefined") return;
  return localStorage.getItem("ref");
};
