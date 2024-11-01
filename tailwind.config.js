/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Geist"'],
				mono: ['"Geist Mono"'],
				serif: ['"Aleo"']
			},
			backgroundImage: {
				stripe: 'repeating-linear-gradient(-45deg,var(--tw-gradient-stops))'
			}
		}
	},
	plugins: []
};
