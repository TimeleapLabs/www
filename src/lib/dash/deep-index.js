import { default as GaugeHigh } from "src/icons/GaugeHigh.svelte";
import { default as GaugeLow } from "src/icons/GaugeLow.svelte";
import { default as GaugeMax } from "src/icons/GaugeMax.svelte";
import { default as GaugeMed } from "src/icons/GaugeMed.svelte";

export const chainOptions = [
  { label: "Ethereum", value: "ethereum-mainnet" },
  { label: "Ethereum Goerli", value: "ethereum-goerli" },
  { label: "Aurora", value: "aurora-mainnet" },
  { label: "Aurora Testnet", value: "aurora-testnet" },
  {
    label: "Avalanche C-Chain",
    value: "avalanche-mainnet",
  },
  {
    label: "Avalanche Fuji C-Chain",
    value: "avalanche-fuji",
  },
  { label: "Bitgert", value: "bitgert-mainnet" },
  { label: "Bitgert Testnet", value: "bitgert-testnet" },
  {
    label: "BNB Smart Chain",
    value: "binance-mainnet",
  },
  {
    label: "BNB Smart Chain Testnet",
    value: "binance-testnet",
  },
  { label: "Fantom", value: "fantom-mainnet" },
  { label: "Fantom Testnet", value: "fantom-testnet" },
  { label: "Polygon", value: "polygon-mainnet" },
  { label: "Polygon Mumbai", value: "polygon-mumbai" },
];

export const tiers = {
  startup: {
    name: "Startup",
    storage: 2,
    events: 3,
    speed: "Normal",
    price: 49.95,
    for: "small",
    gauge: GaugeLow,
  },
  growth: {
    name: "Growth",
    storage: 4,
    events: 6,
    speed: "Fast",
    price: 99.95,
    for: "medium",
    gauge: GaugeMed,
  },
  business: {
    name: "Business",
    storage: 8,
    events: 12,
    speed: "Faster",
    price: 199.95,
    for: "heavy",
    gauge: GaugeHigh,
  },
  enterprise: {
    name: "Enterprise",
    storage: 16,
    events: 24,
    speed: "Instant",
    price: 399.95,
    for: "intense",
    gauge: GaugeMax,
  },
};
