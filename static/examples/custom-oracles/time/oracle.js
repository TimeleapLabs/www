export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      method: "setTime",
      args: [new Date().valueOf()],
      maxGas: "100000000000000", // 0.0001 ETH
      abort: false,
    }),
  };
};
