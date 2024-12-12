const underScore = `<tspan
   style="fill:#4ade80;fill-opacity:1;stroke-width:0.499999"
   id="tspan229268-4">_</tspan>`;

const textToTspan = (text: string) => {
	const lines = text.split('\n');
	return lines
		.map(
			(line, index) =>
				`<tspan x="0" dy="${index === 0 ? '0' : '1.2'}em" style="fill:#ffffff;fill-opacity:1;stroke-width:0.499999">
          ${line} ${index === lines.length - 1 ? underScore : ''}
        </tspan>`
		)
		.join('');
};

export const createSocial = (text: string, fontSize: number = 28) => {
	return `<svg
   width="1600"
   height="900"
   viewBox="0 0 423.33332 238.125"
   version="1.1"
   id="svg763113"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs763110" />
  <g
     id="layer1">
    <rect
       style="fill:#000000;stroke-width:9.92488;stroke-linecap:round;stroke-linejoin:bevel;paint-order:stroke fill markers"
       id="rect764052"
       width="423.33334"
       height="238.125"
       x="0"
       y="0" />
    <text
       xml:space="preserve"
       font-family="Geist"
       style="font-size:${fontSize}px;font-family:'Geist';fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.499999;stroke-linecap:round;stroke-linejoin:bevel;stroke-opacity:1;paint-order:stroke fill markers"
       x="40"
       y="60"
       id="text229272-7">
      ${textToTspan(text)}
    </text>
    <g
       id="g4919"
       transform="matrix(0.26458334,0,0,0.26458334,-231.2722,-39.002228)"
       style="opacity:0.934;fill:#ffffff;fill-opacity:1">
      <g
         id="Layer_2"
         data-name="Layer 2"
         transform="matrix(0.0202395,0,0,0.0202395,2382.5835,949.06716)"
         style="fill:#ffffff;fill-opacity:1">
        <polygon
           class="cls-2"
           points="772.3,573.1 772.3,967.6 721.9,967.6 721.9,1835.5 725,1835.5 725,1864 1592.9,1864 1592.9,1426.9 1159,1426.9 1159,1079.9 1209.3,1079.9 1209.3,573.1 1552.3,573.1 1552.3,136 407.1,136 407.1,573.1 "
           id="polygon4909"
           style="fill:#ffffff;fill-opacity:1;stroke-width:0px" />
      </g>
    </g>
  </g>
</svg>`;
};
