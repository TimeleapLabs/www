export const safeJoin = (v) => {
  return Array.isArray(v) ? v.join(", ") : v;
};

export const conditionNames = {
  "contract-is": "Contract address",
  "arg-is": "Argument",
  "event-name-is": "Event name",
  "event-signature-is": "Event signature",
  "block-number-is": "Block",
};

export const getFilterValue = (filter) => {
  if (filter.condition === "contract-is") {
    return safeJoin(filter.value);
  }
  if (filter.condition === "arg-is") {
    return `${filter.arg} is ${safeJoin(filter.value)}`;
  }
  if (filter.condition === "event-name-is") {
    return safeJoin(filter.value);
  }
  if (filter.condition === "event-signature-is") {
    return safeJoin(filter.value);
  }
  if (filter.condition === "block-number-is") {
    return filter.comparison === "gt"
      ? `> ${safeJoin(filter.value)}`
      : `< ${safeJoin(filter.value)}`;
  }
};
