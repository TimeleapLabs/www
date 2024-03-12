import sha3 from "js-sha3";
import { Buffer } from "buffer";

const chars = "0123456789ABCDEFGHJKMNPQRSTUVXYZ";

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

export const fromBase32 = (input) => {
  let output = [];
  let temp = 0;
  let bits = 0;

  const uppercase = input.toUpperCase();

  for (let i = 0; i < uppercase.length; i++) {
    const index = chars.indexOf(uppercase[i]);

    if (index === -1) {
      throw new Error(`Invalid character found: ${uppercase[i]}`);
    }

    temp = (temp << 5) | index;
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      output.push((temp >> bits) & 0xff);
    }
  }

  return Buffer.from(output);
};

export const shake = (input) => Buffer.from(sha3.shake256(input, 512), "hex");

export const addressFromShake = (input) => {
  const address = toBase32(input.slice(0, 20));
  const checksum = shake(address);
  return address + chars[checksum[0] % 32] + chars[checksum[1] % 32];
};

export const calculateAddress = (input) => {
  const hash = shake(input);
  return addressFromShake(hash);
};

export const verifyChecksum = (address) => {
  const uppercase = address.toUpperCase();

  const baseAddress = uppercase.slice(0, -2);
  const providedChecksum = uppercase.slice(-2);

  const checksum = shake(baseAddress);
  const calculatedChecksum = chars[checksum[0] % 32] + chars[checksum[1] % 32];

  return providedChecksum === calculatedChecksum;
};

export const recoverAddress = (input) => {
  if (input.length !== 34) {
    throw new Error(`Wrong address length`);
  }

  if (!verifyChecksum(input)) {
    throw new Error(`Invalid checksum`);
  }

  return fromBase32(input.slice(0, -2));
};
