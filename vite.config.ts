import path from "node:path";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// eslint-disable-next-line import/no-default-export -- must be default export
export default defineConfig({
  base: "/fortune-wheel/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
