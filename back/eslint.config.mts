import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [
      "plugin:js/recommended",
      ...tseslint.configs.recommended,
    ],
    rules: {
      // ✅ Reglas mínimas para estilo y errores comunes
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);