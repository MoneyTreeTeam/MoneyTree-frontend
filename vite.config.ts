import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	base: "/MoneyTree-frontend",

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},

	plugins: [
		vue()
	],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/assets/styles/base/variables.scss" as *;
					@use "@/assets/styles/base/colors.scss" as *;
					@use "@/assets/styles/base/typography.scss" as *;
					@use "@/assets/styles/base/mixins.scss" as *;
				`,
			},
		},
	},

	server: {
		host: "0.0.0.0",
		port: 3000,
	},

	build: {
		target: "esnext",
		cssCodeSplit: true,
	}
});