export const headersToGoStyle = (headers) =>
  Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, [value.toString()]])
  );
