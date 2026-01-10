import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // ...compat.extends("next/core-web-vitals"),
  // ...compat.extends("plugin:tailwindcss/recommended"),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
);