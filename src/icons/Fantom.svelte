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
  viewBox="0 0 12 19.9"
  version="1.1"
  id="svg142"
  sodipodi:docname="ftm.svg"
  inkscape:version="1.2.1 (9c6d41e4, 2022-07-14)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  width={size}
  height={size}
  {...attributes}
  {...$$restProps}
>
  <sodipodi:namedview
    id="namedview144"
    pagecolor="#ffffff"
    bordercolor="#999999"
    borderopacity="1"
    inkscape:showpageshadow="0"
    inkscape:pageopacity="0"
    inkscape:pagecheckerboard="0"
    inkscape:deskcolor="#d1d1d1"
    showgrid="false"
    inkscape:zoom="7.375"
    inkscape:cx="6.0338983"
    inkscape:cy="10.101695"
    inkscape:window-width="1792"
    inkscape:window-height="1067"
    inkscape:window-x="0"
    inkscape:window-y="25"
    inkscape:window-maximized="1"
    inkscape:current-layer="svg142"
  />
  <defs id="defs136">
    <mask
      id="mask"
      x="10"
      y="6"
      width="93.1"
      height="20"
      maskUnits="userSpaceOnUse"
    >
      <g id="a">
        <path class="cls-1" d="m 10,6 h 93.1 V 26 H 10 Z" id="path132" />
      </g>
    </mask>
  </defs>
  <title id="title138">fa</title>
  <path
    class="cls-1"
    d="M 7.2,6.9 10.8,4.8 V 9 Z m 3.6,9 L 6,18.7 1.2,15.9 V 11 L 6,13.8 10.8,11 Z M 1.2,4.8 4.8,6.9 1.2,9 Z M 6.6,7.9 10.2,10 6.6,12.1 Z M 5.4,12.1 1.8,10 5.4,7.9 Z M 10.2,3.8 6,6.2 1.8,3.8 6,1.3 Z M 0,3.4 v 13.1 l 6,3.4 6,-3.4 V 3.4 L 6,0 Z"
    id="path140"
  />
  <metadata id="metadata263">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:title>fa</dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
</svg>
