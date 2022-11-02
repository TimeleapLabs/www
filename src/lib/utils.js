export const exclude = (obj, keys) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );

export const getList = (multiline) =>
  multiline
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const allowFromValues = ({
  contracts,
  events,
  minBlock,
  maxBlock,
  args,
}) => {
  const allow = [];
  if (contracts) {
    allow.push({ condition: "contract-is", value: getList(contracts) });
  }
  if (events) {
    allow.push({ condition: "event-name-is", value: getList(events) });
  }
  if (minBlock) {
    allow.push({
      condition: "block-number-is",
      comparison: "gt",
      value: [minBlock],
    });
  }
  if (maxBlock) {
    allow.push({
      condition: "block-number-is",
      comparison: "lt",
      value: [maxBlock],
    });
  }
  if (args) {
    const argMap = {};
    for (const arg of args) {
      if (arg.argument && arg.value) {
        argMap[arg.argument] = argMap[arg.argument] || [];
        argMap[arg.argument].push(arg.value);
      }
    }
    for (const arg in argMap) {
      allow.push({
        condition: "arg-is",
        arg,
        value: argMap[arg],
      });
    }
  }
  return allow;
};

export const valuesFromAllow = (allow) => {
  const contracts = [];
  const events = [];
  const args = [];
  let minBlock = 0;
  let maxBlock = 0;

  for (const value of allow) {
    if (value.condition === "contract-is") {
      contracts.push(...value.value);
    } else if (value.condition === "event-name-is") {
      events.push(...value.value);
    } else if (value.condition === "block-number-is") {
      if (value.comparison === "lt") {
        maxBlock = value.value[0];
      } else {
        minBlock = value.value[0];
      }
    } else if (value.condition === "arg-is") {
      for (const item of value.value) {
        args.push({ argument: value.arg, value: item });
      }
    }
  }

  return {
    contracts: contracts.join("\n"),
    events: events.join("\n"),
    minBlock,
    maxBlock,
    arguments: args,
  };
};
