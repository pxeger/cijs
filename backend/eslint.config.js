// @ts-check
import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config(
  {
    ignores: ["migration_template.ts"],
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
  },
  js.configs.recommended,
  {
    rules: {
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
    },
  },
  ...ts.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
