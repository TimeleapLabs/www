<script>
  import * as d3 from "d3";

  import { TextInput, Column, Row, Slider } from "carbon-components-svelte";
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";
  import { theme } from "src/stores/theme";

  export let transactions;

  let element;
  let maxTransactions = Math.min(transactions.length, 500);

  const colorForUser = (node) => {
    if (!node) {
      return $theme === "g100" ? "#f6f2ff" : "#a56eff";
    }
    const length =
      (node?.incoming?.length || 0) + (node?.outgoing?.length || 0);
    if (length < 2) {
      return $theme === "g100" ? "#f6f2ff" : "#a56eff";
    } else if (length < 4) {
      return $theme === "g100" ? "#e8daff" : "#8a3ffc";
    } else if (length < 16) {
      return $theme === "g100" ? "#d4bbff" : "#6929c4";
    } else if (length < 64) {
      return $theme === "g100" ? "#be95ff" : "#491d8b";
    } else if (length < 128) {
      return $theme === "g100" ? "#a56eff" : "#31135e";
    } else {
      return $theme === "g100" ? "#8a3ffc" : "#1c0f30";
    }
  };

  const colorForLink = (node) => {
    if (!node[0]) {
      return $theme === "g100" ? "#d9fbfb" : "#009d9a";
    }
    const length =
      (node[0]?.incoming?.length || 0) + (node[0]?.outgoing?.length || 0);
    if (length < 2) {
      return $theme === "g100" ? "#d9fbfb" : "#009d9a";
    } else if (length < 4) {
      return $theme === "g100" ? "#9ef0f0" : "#007d79";
    } else if (length < 16) {
      return $theme === "g100" ? "#3ddbd9" : "#005d5d";
    } else if (length < 64) {
      return $theme === "g100" ? "#08bdba" : "#004144";
    } else if (length < 128) {
      return $theme === "g100" ? "#009d9a" : "#022b30";
    } else {
      return $theme === "g100" ? "#007d79" : "#081a1c";
    }
  };

  const colorin = "#0072c3";
  const colorout = "#da1e28";
  const colornone = "#f6f2ff";

  function bilink(root) {
    const map = new Map(root.leaves().map((d) => [id(d), d]));
    for (const d of root.leaves()) {
      d.incoming = [];
      d.outgoing = d.data.sends.map((tx) => [d, map.get(tx.event.args.to)]);
    }
    for (const d of root.leaves()) {
      for (const o of d.outgoing) {
        o[1].incoming.push(o);
      }
    }
    return root;
  }

  function id(node) {
    return node.data.name;
  }

  const matchName = (name) => (node) => node.data.name.includes(name);

  let address;

  const filter = (hierarchy, address) => {
    if (address) {
      hierarchy.children = hierarchy.children.filter((node) => {
        const matcher = matchName(address);
        return (
          matcher(node) ||
          node.incoming.some((arr) => arr.some(matcher)) ||
          node.outgoing.some((arr) => arr.some(matcher))
        );
      });
    }
    return hierarchy;
  };

  const getChart = (element, filterByAddress, maxTransactions) => {
    const users = [
      ...new Set(
        transactions
          .slice(-maxTransactions)
          .map((tx) => [tx.event.args.from, tx.event.args.to])
          .flat()
      ),
    ];

    const hierarchy = {
      name: "Transactions",
      children: users.map((user) => ({
        name: user,
        sends: transactions
          .slice(-maxTransactions)
          .filter((tx) => tx.event.args.from === user),
      })),
    };

    const width = element.offsetWidth;
    const radius = width / 2 - 120;

    const tree = d3.cluster().size([2 * Math.PI, radius - 100]);
    const root = tree(
      filter(
        bilink(
          d3
            .hierarchy(hierarchy)
            .sort(
              (a, b) =>
                d3.ascending(a.height, b.height) ||
                d3.ascending(a.data.name, b.data.name)
            )
        ),
        filterByAddress
      )
    );

    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", width)
      .attr("viewBox", [-width / 2, -width / 2, width, width])
      .attr(
        "style",
        'max-width: 100%; height: auto; font: 8px "IBM Plex Sans";'
      );

    const node = svg
      .append("g")
      .selectAll()
      .data(root.leaves())
      .join("g")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI ? 6 : -6))
      .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
      .attr("transform", (d) => (d.x >= Math.PI ? "rotate(180)" : null))
      .classed("rotated", (d) => d.x >= Math.PI)
      .attr("fill", colorForUser)
      .text((d) => d.data.name)
      .each(function (d) {
        d.text = this;
      })
      .on("mouseover", overed)
      .on("mouseout", outed)
      .call((text) =>
        text.append("title").text(
          (d) => `${id(d)}
${d.outgoing.length} outgoing
${d.incoming.length} incoming`
        )
      );

    const line = d3
      .lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius((d) => d.y)
      .angle((d) => d.x);

    const link = svg
      .append("g")
      .attr("fill", "none")
      .selectAll()
      .data(root.leaves().flatMap((leaf) => leaf.outgoing))
      .join("path")
      //.style("mix-blend-mode", "multiply")
      .attr("d", ([i, o]) => line(i.path(o)))
      .attr("stroke", colorForLink)
      .each(function (d) {
        d.path = this;
      });

    function overed(event, d) {
      //link.style("mix-blend-mode", null);
      d3.select(this).attr("font-weight", "bold").classed("active", true);
      d3.selectAll(d.incoming.map((d) => d.path))
        .attr("stroke", colorin)
        .raise();
      d3.selectAll(d.incoming.map(([d]) => d.text))
        .attr("fill", colorin)
        .attr("font-weight", "bold")
        .classed("active", true);
      d3.selectAll(d.outgoing.map((d) => d.path))
        .attr("stroke", colorout)
        .raise();
      d3.selectAll(d.outgoing.map(([, d]) => d.text))
        .attr("fill", colorout)
        .attr("font-weight", "bold")
        .classed("active", true);
    }

    function outed(event, d) {
      //link.style("mix-blend-mode", "multiply");
      d3.select(this).attr("font-weight", null).classed("active", false);
      d3.selectAll(d.incoming.map((d) => d.path)).attr("stroke", colorForLink);
      d3.selectAll(d.incoming.map(([d]) => d.text))
        .attr("fill", colorForUser)
        .attr("font-weight", null)
        .classed("active", false);
      d3.selectAll(d.outgoing.map((d) => d.path)).attr("stroke", colorForLink);
      d3.selectAll(d.outgoing.map(([, d]) => d.text))
        .attr("fill", colorForUser)
        .attr("font-weight", null)
        .classed("active", false);
    }

    return svg.node();
  };

  $: if (element && $theme) {
    try {
      const chart = getChart(element, address, maxTransactions);
      element.innerHTML = "";
      element.appendChild(chart);
    } catch (error) {}
  }

  let innerWidth;

  $: if (innerWidth) {
    maxTransactions = Math.floor(innerWidth ** 2 / 6666);
  }
</script>

<svelte:window bind:innerWidth />

<Row>
  <Column>
    Edge Map displays a map of all connected wallets in this ecosystem.
  </Column>
</Row>
<Row>
  <Column>
    <ExpressiveHeading size={1}>
      <h3>Filters</h3>
    </ExpressiveHeading>
  </Column>
</Row>
<Row>
  <Column>
    <TextInput
      bind:value={address}
      placeholder="0x42..."
      labelText="Wallet Address"
    />
  </Column>
  <Column>
    <Slider
      labelText="Max Transactions"
      min={0}
      max={transactions.length}
      fullWidth
      bind:value={maxTransactions}
    />
  </Column>
</Row>
<Row>
  <Column>
    <ExpressiveHeading size={1}>
      <h3>Map</h3>
    </ExpressiveHeading>
  </Column>
</Row>
<Row>
  <Column>
    <div class="edge-map" bind:this={element} />
  </Column>
</Row>

<style>
  .edge-map :global(.active) {
    transform: translateX(10px);
  }
  .edge-map :global(.active.rotated) {
    transform: rotate(180deg) translateX(-10px);
  }
  .edge-map :global(text) {
    transition: transform 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
</style>
