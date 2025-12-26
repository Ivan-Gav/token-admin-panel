import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import scrollbarPlugin from "tailwind-scrollbar";
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    scrollbarPlugin,
    svgr({
      include: "**/*.svg?react",
    }),
    tanstackRouter({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/router/routeTree.gen.ts",
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
