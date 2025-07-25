import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/components"),
			"@redux": path.resolve(__dirname, "src/redux"),
		},
	},

	server: {
		port: 5173,
		open: true,
	},

	optimizeDeps: {
		include: ["react", "react-dom"],
	},

	build: {
		chunkSizeWarningLimit: 500,
	},
});
