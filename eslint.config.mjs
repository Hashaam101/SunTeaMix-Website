import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import * as tailwindModule from "eslint-plugin-tailwindcss";
const tailwind = tailwindModule?.default ?? tailwindModule;
import path from "path";

export default tseslint.config(
  { ignores: [".next/", "node_modules/"] },
  js.configs.recommended,
  ...(tseslint?.configs?.recommended ?? []),
  ...(tailwind?.configs?.["flat/recommended"] ?? []),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      tailwindcss: {
        // Use the CSS entry that imports Tailwind (@import "tailwindcss") so the
        // worker can parse the design system correctly.
        config: path.resolve(process.cwd(), "src/app/globals.css"),
      },
    },
  }
);
