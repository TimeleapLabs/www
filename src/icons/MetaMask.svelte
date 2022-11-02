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
  viewBox="0 0 256 237.39996"
  xml:space="preserve"
  sodipodi:docname="MetaMask.svg"
  inkscape:version="1.1.1 (c3084ef, 2021-09-22)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  {...attributes}
  {...$$restProps}
  ><defs id="defs3198" /><sodipodi:namedview
    id="namedview3196"
    pagecolor="#ffffff"
    bordercolor="#999999"
    borderopacity="1"
    inkscape:pageshadow="0"
    inkscape:pageopacity="0"
    inkscape:pagecheckerboard="0"
    showgrid="false"
    fit-margin-top="0"
    fit-margin-left="0"
    fit-margin-right="0"
    fit-margin-bottom="0"
    inkscape:zoom="2.1406152"
    inkscape:cx="128.00059"
    inkscape:cy="124.02977"
    inkscape:window-width="1792"
    inkscape:window-height="1067"
    inkscape:window-x="0"
    inkscape:window-y="25"
    inkscape:window-maximized="1"
    inkscape:current-layer="Layer_1"
  />
  <style type="text/css" id="style3125">
    .st0 {
      fill: #e2761b;
      stroke: #e2761b;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st1 {
      fill: #e4761b;
      stroke: #e4761b;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st2 {
      fill: #d7c1b3;
      stroke: #d7c1b3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st3 {
      fill: #233447;
      stroke: #233447;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st4 {
      fill: #cd6116;
      stroke: #cd6116;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st5 {
      fill: #e4751f;
      stroke: #e4751f;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st6 {
      fill: #f6851b;
      stroke: #f6851b;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st7 {
      fill: #c0ad9e;
      stroke: #c0ad9e;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st8 {
      fill: #161616;
      stroke: #161616;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .st9 {
      fill: #763d16;
      stroke: #763d16;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  </style>
  <polygon
    class="st0"
    points="193,65.8 274.1,35.5 174.6,109.4 "
    id="polygon3127"
    transform="translate(-31.300002,-35.000031)"
  />
  <g id="g3143" transform="translate(-31.300002,-35.000031)">
    <polygon
      class="st1"
      points="125.6,65.8 44.4,35.5 143.1,110.1 "
      id="polygon3129"
    />
    <polygon
      class="st1"
      points="268.5,263 284.8,207.7 238.3,206.8 211.8,247.4 "
      id="polygon3131"
    />
    <polygon
      class="st1"
      points="106.8,247.4 80.3,206.8 33.9,207.7 50.1,263 "
      id="polygon3133"
    />
    <polygon
      class="st1"
      points="144.1,164.6 142.1,104.1 103.6,138.2 87.8,162.1 "
      id="polygon3135"
    />
    <polygon
      class="st1"
      points="174.6,164.6 230.8,162.1 214.9,138.2 175.9,103.4 "
      id="polygon3137"
    />
    <polygon
      class="st1"
      points="111.4,208.1 106.8,247.4 140.6,230.9 "
      id="polygon3139"
    />
    <polygon
      class="st1"
      points="207.1,208.1 177.9,230.9 211.8,247.4 "
      id="polygon3141"
    />
  </g>
  <g id="g3149" transform="translate(-31.300002,-35.000031)">
    <polygon
      class="st2"
      points="180.6,253 180.3,262.3 211.8,247.4 177.9,230.9 "
      id="polygon3145"
    />
    <polygon
      class="st2"
      points="138.1,253 140.6,230.9 106.8,247.4 138.3,262.3 "
      id="polygon3147"
    />
  </g>
  <polygon
    class="st3"
    points="130.5,176.1 138.8,193.5 110.6,185.2 "
    id="polygon3151"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st3"
    points="208,185.2 179.7,193.5 188,176.1 "
    id="polygon3153"
    transform="translate(-31.300002,-35.000031)"
  />
  <g id="g3163" transform="translate(-31.300002,-35.000031)">
    <polygon
      class="st4"
      points="80.3,207.7 106.8,247.4 111.6,206.8 "
      id="polygon3155"
    />
    <polygon
      class="st4"
      points="238.3,207.7 207,206.8 211.8,247.4 "
      id="polygon3157"
    />
    <polygon
      class="st4"
      points="179.8,193.5 188.1,176.1 208.1,185.2 230.8,162.1 174.6,164.6 "
      id="polygon3159"
    />
    <polygon
      class="st4"
      points="138.8,193.5 144.1,164.6 87.8,162.1 110.6,185.2 130.6,176.1 "
      id="polygon3161"
    />
  </g>
  <g id="g3173" transform="translate(-31.300002,-35.000031)">
    <polygon
      class="st5"
      points="110.6,185.2 87.8,162.1 111.4,208.1 "
      id="polygon3165"
    />
    <polygon
      class="st5"
      points="230.8,162.1 208.1,185.2 207.1,208.1 "
      id="polygon3167"
    />
    <polygon
      class="st5"
      points="145.4,227.6 146.9,182.7 144.1,164.6 138.8,193.5 "
      id="polygon3169"
    />
    <polygon
      class="st5"
      points="173.1,227.6 179.8,193.5 174.6,164.6 171.9,182.6 "
      id="polygon3171"
    />
  </g>
  <polygon
    class="st6"
    points="177.9,230.9 207.1,208.1 208.1,185.2 179.8,193.5 173.1,227.6 "
    id="polygon3175"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st6"
    points="140.6,230.9 145.4,227.6 138.8,193.5 110.6,185.2 111.4,208.1 "
    id="polygon3177"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st7"
    points="178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 180.3,262.3 180.6,253 "
    id="polygon3179"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st8"
    points="145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 177.9,230.9 173.1,227.6 "
    id="polygon3181"
    transform="translate(-31.300002,-35.000031)"
  />
  <g id="g3187" transform="translate(-31.300002,-35.000031)">
    <polygon
      class="st9"
      points="274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 281.8,129.1 275.6,124.3 283.6,118.2 278.3,114.2 286.8,73.4 "
      id="polygon3183"
    />
    <polygon
      class="st9"
      points="34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 140.6,106.9 44.4,35.5 31.8,73.4 40.3,114.2 "
      id="polygon3185"
    />
  </g>
  <polygon
    class="st6"
    points="230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 267.2,153.5 214.9,138.2 "
    id="polygon3189"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st6"
    points="33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 103.6,138.2 51.3,153.5 "
    id="polygon3191"
    transform="translate(-31.300002,-35.000031)"
  />
  <polygon
    class="st6"
    points="193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 173.1,227.6 173.3,182.8 174.6,164.6 177.9,106.9 "
    id="polygon3193"
    transform="translate(-31.300002,-35.000031)"
  />
</svg>
