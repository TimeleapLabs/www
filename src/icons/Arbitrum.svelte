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
  xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  id="Layer_1"
  x="0px"
  y="0px"
  viewBox="0 0 2500 2500"
  xml:space="preserve"
  width={size}
  height={size}
  {...attributes}
  {...$$restProps}
>
  <g id="Layer_x0020_1">
    <g id="_2405588477232">
      <g id="g429">
        <g id="g427">
          <g id="g734"
            ><g id="g413">
              <g id="g411">
                <g id="g405">
                  <path
                    class="st2"
                    d="M1435,1440l-121,332c-3,9-3,19,0,29l208,571l241-139l-289-793C1467,1422,1442,1422,1435,1440z"
                    id="path403"
                    style="fill:currentColor;fill-opacity:1"
                  />
                </g>
                <g id="g409">
                  <path
                    class="st2"
                    d="M1678,882c-7-18-32-18-39,0l-121,332c-3,9-3,19,0,29l341,935l241-139L1678,883V882z"
                    id="path407"
                    style="fill:currentColor;fill-opacity:1"
                  />
                </g>
              </g>
            </g><g id="g417">
              <path
                class="st3"
                d="M1250,155c6,0,12,2,17,5l918,530c11,6,17,18,17,30v1060c0,12-7,24-17,30l-918,530c-5,3-11,5-17,5       s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12,7-24,17-30l918-530c5-3,11-5,17-5l0,0V155z M1250,0c-33,0-65,8-95,25L237,555       c-59,34-95,96-95,164v1060c0,68,36,130,95,164l918,530c29,17,62,25,95,25s65-8,95-25l918-530c59-34,95-96,95-164V719       c0-68-36-130-95-164L1344,25c-29-17-62-25-95-25l0,0H1250z"
                id="path415"
                style="fill:currentColor;fill-opacity:1"
              />
            </g></g
          >

          <g id="g425" transform="translate(5.7027593,3.0013715)">
            <path
              class="st4"
              d="M 1172,644 H 939 c -17,0 -33,11 -39,27 L 401,2039 642,2178 1192,671 c 5,-14 -5,-28 -19,-28 z"
              id="path421"
              style="fill:currentColor;fill-opacity:1"
            />
            <path
              class="st4"
              d="m 1580,644 h -233 c -17,0 -33,11 -39,27 L 738,2233 979,2372 1599,671 c 5,-14 -5,-28 -19,-28 z"
              id="path423"
              style="fill:currentColor;fill-opacity:1"
            />
          </g></g
        >
      </g>
    </g>
  </g>
</svg>
