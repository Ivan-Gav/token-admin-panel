import { defineConfig, type PluginOption, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import scrollbarPlugin from "tailwind-scrollbar";
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { visualizer } from "rollup-plugin-visualizer";

import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
        autoCodeSplitting: true,
      }),
      visualizer({
        emitFile: true,
        filename: "bundlestats.html",
      }) as PluginOption,
    ],
    base: env.VITE_BASE_URL ? `/${env.VITE_BASE_URL}/` : "/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/\/react(?:-dom)?/.test(id)) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
