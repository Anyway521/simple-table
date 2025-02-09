import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx()
	],
	test: {
		globals: true,
		environment: "jsdom",
		coverage: {
			exclude: [
				'src/components/table/types.ts',
				'src/components/pagination/types.ts'
			]
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components/')
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			}
		},
	}
});
