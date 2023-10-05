<script>
  import "@carbon/charts-svelte/styles.css";

  import { CirclePackChart } from "@carbon/charts-svelte";

  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { theme } from "src/stores/theme";

  let transactions = [];
  let richData = [];
  let distributionCircleData = [];

  const distributionCircle = () => {
    const filtered = richData
      .map((rich) => ({
        name: rich.address,
        value: parseFloat(ethers.utils.formatUnits(rich.balance)),
      }))
      .filter((rich) => rich.value > 0)
      .sort((a, b) => b.value - a.value);

    const topTen = filtered.slice(0, 10);
    const topFifty = filtered.slice(10, 50);
    const topHundred = filtered.slice(50, 100);
    const topFiveHundred = filtered.slice(100, 500);
    const topThousand = filtered.slice(100, 1000);
    const rest = filtered.slice(1000);

    distributionCircleData = [
      { name: "Top 10", children: topTen },
      { name: "Top 50", children: topFifty },
      { name: "Top 100", children: topHundred },
      { name: "Top 500", children: topFiveHundred },
      { name: "Top 1000", children: topThousand },
      { name: "Rest", children: rest },
    ];
  };

  const richList = () => {
    const balances = {};
    for (const tx of transactions) {
      const { from, to, amount } = tx.event.args;

      balances[from] = balances[from] || ethers.BigNumber.from(0);
      balances[to] = balances[to] || ethers.BigNumber.from(0);

      if (from !== "0x0000000000000000000000000000000000000000") {
        balances[from] = balances[from].sub(amount);
      }

      balances[to] = balances[to].add(amount);
    }

    richData = Object.entries(balances).map(([address, balance]) => ({
      id: address,
      address,
      balance,
    }));

    distributionCircle();
  };

  onMount(async () => {
    const endpoint = "https://api.kenshi.io/index/mql";
    const apikey = "fSDjCXCTyq+cx7+HLXKBA5oGIfqyMwztb+0/7pvTK8I=";
    const owner = "0x51DD193630806aDCFFa9E72569a71A9c12591C33";

    /**
     * Define your MQL request here
     */
    const request = {
      blockchain: "arbitrum-mainnet",
      owner,
      apikey,
      query: {
        "event.name": "Transfer",
        "block.address": "0xf1264873436a0771e440e2b28072fafcc5eebd01",
      },
    };

    /**
     * Post request sending the MQL request to the
     * Kenshi Deep Index endpoint
     */
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(request),
    });

    /**
     * Receive the data and print it
     */
    transactions = await response.json();

    richList();
  });
</script>

<div class="no-node-groups">
  {#if distributionCircleData.length}
    <CirclePackChart
      data={distributionCircleData}
      options={{
        title: "Whale Chart",
        height: "600px",
        theme: $theme,
      }}
    />
  {/if}
</div>
