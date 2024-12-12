import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import { createSocial } from './templates/social';

const isVercel = process.env.VERCEL === '1';
const fontRawPath = 'fonts/geist-sans/Geist-Bold.ttf';
const fontPath = isVercel ? `./${fontRawPath}` : `./static/${fontRawPath}`;

export const generateSocial = async (text: string, fontSize: number) => {
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
