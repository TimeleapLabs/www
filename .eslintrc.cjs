module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		es2020: true,
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'no-unused-vars': [2, { args: 'after-used', argsIgnorePattern: '^_' }]
	}
};
