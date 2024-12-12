import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import { createSocial } from './templates/social';
import { writeFileSync, existsSync } from 'fs';

const fontPath = '/tmp/Geist-Bold.ttf';

export const generateSocial = async (text: string, fontSize: number) => {
	if (!existsSync(fontPath)) {
		const request = await fetch('https://timeleap.swiss/fonts/geist-sans/Geist-Bold.ttf');
		const geist = await request.arrayBuffer();
		writeFileSync(fontPath, Buffer.from(geist));
	}

	const svg = createSocial(text, fontSize);
	const opts: ResvgRenderOptions = {
		font: { fontFiles: [fontPath], loadSystemFonts: false },
		fitTo: { mode: 'width', value: 3200 }
	};

	const resvg = new Resvg(svg, opts);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
};
