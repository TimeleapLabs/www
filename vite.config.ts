import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unfonts from 'unplugin-fonts/vite';
import type { CustomFontFace } from 'unplugin-fonts/types';

const unfontTransform = (font: CustomFontFace) => {
	return {
		...font,
		files: font.files.map((file) => ({
			...file,
			path: file.path.replace('/static', '')
		}))
	};
};

export default defineConfig({
	plugins: [
		sveltekit(),
		unfonts({
			custom: {
				families: [
					{
						name: 'Geist',
						src: './static/fonts/geist-sans/*.woff2',
						transform: unfontTransform
					},
					{
						name: 'Geist Mono',
						src: './static/fonts/geist-mono/*.woff2',
						transform: unfontTransform
					}
				]
			}
		})
	]
});
