<script>
  export let size = 16;

  export let title = undefined;

  $: labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  $: attributes = {
    "aria-hidden": labelled ? undefined : true,
    role: labelled ? "img" : undefined,
    focusable: Number($$props["tabindex"]) === 0 ? true : undefined,
  };
</script>

<svg
  version="1.1"
  id="Layer_1"
  x="0px"
  y="0px"
  viewBox="0 0 1450.8 1706.2"
  xml:space="preserve"
  sodipodi:docname="bnb.svg"
  inkscape:version="1.2.1 (9c6d41e4, 2022-07-14)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  {...attributes}
  {...$$restProps}
>
  <defs id="defs145" />
  <sodipodi:namedview
    id="namedview143"
    pagecolor="#ffffff"
    bordercolor="#999999"
    borderopacity="1"
    inkscape:showpageshadow="0"
    inkscape:pageopacity="0"
    inkscape:pagecheckerboard="0"
    inkscape:deskcolor="#d1d1d1"
    showgrid="false"
    inkscape:zoom="0.094551282"
    inkscape:cx="735.05085"
    inkscape:cy="861.9661"
    inkscape:window-width="1792"
    inkscape:window-height="1067"
    inkscape:window-x="0"
    inkscape:window-y="25"
    inkscape:window-maximized="1"
    inkscape:current-layer="Layer_1"
  />
  <g id="g140" transform="translate(-522.6,-394.9)">
    <path
      style="fill:currentColor"
      d="m 685.9,1248 0.9,330 280.4,165 v 193.2 L 522.7,1675.5 v -524 z m 0,-330 v 192.3 L 522.6,1013.7 V 821.4 L 685.9,724.8 850,821.4 Z m 398.4,-96.6 163.3,-96.6 164.1,96.6 -164.1,96.6 z"
      id="path132"
    />
    <path
      style="fill:currentColor"
      d="m 803.9,1509.6 v -193.2 l 163.3,96.6 v 192.3 z m 280.4,302.6 163.3,96.6 164.1,-96.6 v 192.3 l -164.1,96.6 -163.3,-96.6 z m 561.6,-990.8 163.3,-96.6 164.1,96.6 v 192.3 l -164.1,96.6 V 918 l -163.3,-96.6 z m 163.3,756.6 0.9,-330 163.3,-96.6 v 524 l -444.5,260.7 V 1742.9 L 1809.2,1578 Z"
      id="path134"
    />
    <polygon
      style="fill:currentColor"
      points="1528.8,1413 1692.1,1316.4 1692.1,1509.6 1528.8,1605.3 "
      id="polygon136"
    />
    <path
      style="fill:currentColor"
      d="m 1692.1,986.4 0.9,193.2 -281.2,165 v 330.8 l -163.3,95.7 -163.3,-95.7 V 1344.6 L 804,1179.6 V 986.4 l 164,-96.6 279.5,165.8 281.2,-165.8 164.1,96.6 z M 803.9,656.5 1247.6,394.9 1692.1,656.5 1528.8,753.1 1247.6,587.3 967.2,753.1 Z"
      id="path138"
    />
  </g>
</svg>
