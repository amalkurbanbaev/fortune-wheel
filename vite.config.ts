import path from "node:path";

import { defineConfig } from "vite";

import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line import/no-default-export -- must be default export
export default defineConfig({
  build: {
    outDir: "./docs",
  },
  base: "./",
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
