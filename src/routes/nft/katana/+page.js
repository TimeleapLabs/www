/** @type {import('./$types').PageLoad} */
export async function load() {
  return await fetch("https://nft.kenshi.io/katana/data.json")
    .then((res) => res.json())
    .then((nfts) => ({ nfts }));
}
