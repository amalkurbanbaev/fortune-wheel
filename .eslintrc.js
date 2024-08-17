const { resolve } = require("node:path");

const nodeTsConfig = resolve(__dirname, "tsconfig.node.json");
const webTsConfig = resolve(__dirname, "tsconfig.app.json");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: {
    project: [nodeTsConfig, webTsConfig],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "tailwindcss": {
      callees: ["cva", "cn"],
    },
  },
  rules: {
    "import/order": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react/hook-use-state": [1, { allowDestructuredState: true }],
    "react/jsx-no-leaked-render": "off",
    "no-console": ["error", { allow: ["info", "warn", "error"] }],
    "react/jsx-sort-props": "off",
  },
};
