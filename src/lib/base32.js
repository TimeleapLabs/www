import sha3 from "js-sha3";

const chars = "0123456789ABCDEFGHJKMNPQTSTUVXYZ";

export const toBase32 = (input) => {
  let output = "";
  let temp = 0;
  let bits = 0;

  for (let i = 0; i < input.length; i++) {
    const b = input[i];
    temp = (temp << 8) | b;
    bits += 8;

    while (bits >= 5) {
      bits -= 5;
      const index = (temp >> bits) & 0x1f;
      output += chars[index];
    }
  }

  if (bits > 0) {
    const lastChunk = (temp << (5 - bits)) & 0x1f;
    output += chars[lastChunk];
  }

  return output;
};

export const shake = (input) => Buffer.from(sha3.shake256(input, 512), "hex");

export const calculateAddress = (input) => {
  const hash = shake(input);
  const address = toBase32(hash.slice(0, 20));
  const checksum = shake(address);
  return address + chars[checksum[0] % 32] + chars[checksum[1] % 32];
};
