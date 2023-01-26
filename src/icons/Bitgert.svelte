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
  id="Layer_2"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 2000 2000"
  style="enable-background:new 0 0 2000 2000;"
  xml:space="preserve"
  width={size}
  height={size}
  {...attributes}
  {...$$restProps}
>
  <style type="text/css">
    .st0 {
      fill: currentColor;
    }
  </style>
  <g>
    <path
      class="st0"
      d="M1467.88,603.13l-766.6-458.9c-28.81-17.25-59.57-25.11-89.54-25.11c-91.26,0-175.25,72.9-175.25,175.21
		v126.03c0,11.65,6.29,22.38,16.43,28.11l161.59,90.88c26.59,14.96,59.43-4.24,59.43-34.75v-99.98l585.24,350.34L673.95,1095.9
		V930.63l44.81,23.32c33.65,17.51,74.31,14.44,104.94-7.93l150.54-109.92c13.86-10.12,12.22-31.28-3.03-39.14L673.95,643.6v0v-0.02
		L472.59,539.71l-8.97-4.63c-0.02,0-0.02-0.02-0.03-0.02l0,0c-12.36-6.35-27.07,2.63-27.08,16.53l0,0v0v255.43v0.01v702.02
		l1029.57-599.81C1582.96,841.16,1583.95,672.62,1467.88,603.13z"
    />
    <path
      class="st0"
      d="M1491.64,1125.7l-99.14-64.5c-23.78-15.47-54.41-15.59-78.31-0.29l-144.35,92.38
		c-17.18,10.99-16.25,36.39,1.68,46.11l73.56,39.85c12.48,6.76,12.75,24.58,0.48,31.71L697.91,1589.3
		c-11.22,6.52-25.35-1.27-25.81-14.24l-3.1-86.89c-0.81-22.61-25.49-36.13-44.98-24.64l-168.91,99.62
		c-11.54,6.8-18.62,19.2-18.62,32.59v115.59c0,130.64,141.7,212.05,254.56,146.26l794-462.87
		C1586.71,1335.46,1590.28,1189.87,1491.64,1125.7z"
    />
  </g>
</svg>
