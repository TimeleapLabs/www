export const parseArg = (arg) =>
  arg.includes(",") ? arg.split(",").map((item) => item.trim()) : [arg] || null;

export const validateArg = (arg) =>
  Array.isArray(arg)
    ? arg.every(validateArg)
    : !arg || arg.match(/^0x[0-9a-f]{1,64}$/i);
