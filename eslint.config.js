import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.tmp/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
      },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.json", "./api/tsconfig.json", "./web/tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);
