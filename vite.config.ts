import { resolve } from "node:path";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// eslint-disable-next-line import/no-default-export -- must be default export
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("/src"),
    },
  },
});
