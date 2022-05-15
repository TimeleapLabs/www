export const getRandomBase64 = (length = 32) =>
  btoa(
    String.fromCharCode.apply(
      null,
      typeof window === "undefined"
        ? []
        : crypto.getRandomValues(new Uint8Array(length))
    )
  );
