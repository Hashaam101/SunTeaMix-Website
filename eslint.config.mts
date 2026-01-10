import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import functional from "eslint-plugin-functional";
import globals from "globals";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", ".vercel/**", "coverage/**"],
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
    plugins: {
      "react-hooks": reactHooks,
      "functional": functional,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/immutability": "error",
      "functional/no-expression-statements": [
        "warn",
        {
          ignoreVoid: false,
          ignoreCodePattern: "^(use|console\\.|window\\.|document\\.|rive\\.|.+\\.scrollIntoView|.+\\.scrollTo|.+\\.addEventListener|.+\\.removeEventListener|setTimeout|clearTimeout|setInterval|clearInterval)"
        }
      ],
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