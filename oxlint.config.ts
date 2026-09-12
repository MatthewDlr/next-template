import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    pedantic: "off",
    perf: "warn",
    style: "off",
    suspicious: "warn",
  },
  env: {
    browser: true, // Enables web API globals (window, document, fetch)
    builtin: true, // Enables standard JavaScript core globals (Promise, Map, etc.)
    node: true, // Enables Node environment globals (process)
  },
  globals: {},
  ignorePatterns: [
    "dist/**",
    "build/**",
    ".next/**",
    "snapshots/**",
    "__screenshots__/**",
    ".next/**",
    "node_modules/**",
    "out/**",
    "next.config.js",
    "next.config.ts",
  ],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["typescript", "react", "react-perf", "nextjs", "vitest", "import"],
  rules: {
    // Enforce App Router usage and prevent Pages Router usage
    "eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            message: "Pages Router API. Use `useRouter` from `next/navigation` instead.",
            name: "next/router",
          },
          { message: "Pages Router API. Use `app/layout.tsx` instead.", name: "next/document" },
          {
            message: "Pages Router API. Use the Metadata API (`export const metadata`) instead.",
            name: "next/head",
          },
          {
            message: "Pages Router API (`AppProps`/`_app`). App Router has no custom App.",
            name: "next/app",
          },
          {
            message: "Pages Router API. Use `app/error.tsx` or `app/not-found.tsx` instead.",
            name: "next/error",
          },
          { message: "Pages Router API. Not supported in App Router.", name: "next/amp" },
        ],
      },
    ],

    // Auto remove unused imports
    "eslint/no-unused-vars": [
      "error",
      {
        fix: {
          imports: "fix",
        },
      },
    ],

    "no-throw-literal": "error", // Stop native throws to enforce the neverthrow pattern

    // Style rules worth enforcing
    "eslint/no-duplicate-imports": "warn",
    "eslint/sort-imports": "warn",
    "react-perf/jsx-no-new-object-as-prop": "warn",

    // Disabled noise rules (conflict with modern React/Next.js practices)
    "react/react-in-jsx-scope": "off", // Obsolete since the JSX transform (React 17+)
    "react/jsx-props-no-spreading": "off", // Canonical for motion wrapper components
    "import/no-named-export": "off", // Named exports are idiomatic for tree-shaking
    "import/prefer-default-export": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/no-unassigned-import": "off", // CSS side-effect imports are valid
    "typescript/consistent-return": "off", // False positive on useEffect cleanup pattern
  },
  settings: {
    next: {
      rootDir: [],
    },
    react: {
      componentWrapperFunctions: [],
      formComponents: [],
      linkComponents: [],
      version: "19",
    },
    vitest: {
      typecheck: false,
    },
  },
});
