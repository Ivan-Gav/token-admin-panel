import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import scrollbarPlugin from "tailwind-scrollbar";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), scrollbarPlugin],
});
