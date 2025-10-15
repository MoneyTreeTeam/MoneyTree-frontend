import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
	js.configs.recommended,
	...vue.configs["flat/recommended"],
	prettier,
	{
		files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			parser: vueParser,
			parserOptions: {
				parser: typescriptParser,
				ecmaVersion: 2021,
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
		},
		rules: {
			"vue/multi-word-component-names": "off",
			"@typescript-eslint/no-unused-vars": ["warn"],
			"no-undef": "off", // TypeScript handles this
		},
	},
	{
		ignores: ["dist/**", "node_modules/**", "*.config.js", "*.config.ts"],
	},
];
