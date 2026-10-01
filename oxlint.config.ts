import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "react", "nextjs", "vitest", "import"],
  jsPlugins: ["@shadcn/lint"],
  options: {
    typeAware: true,
    typeCheck: true,
  },
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
  rules: {
    // @shadcn/lint rules
    "shadcn/no-restyle": ["error", { allow: ["layout"] }],
    "shadcn/no-raw-colors": "error",
    "shadcn/no-arbitrary-values": "error",
    "shadcn/no-inline-styles": "error",
    "shadcn/no-unknown-classes": "error",
    "shadcn/require-static-classes": "error",

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

    "eslint/sort-imports": "off", // Conflicts with oxfmt's sortImports (oxfmt is canonical)

    // Vitest noise rules
    "vitest/require-mock-type-parameters": "off", // vi.fn() infers from usage/typing; pure friction
    "vitest/valid-title": "off", // `describe(component)` is an idiomatic component-suite convention
    "vitest/no-conditional-expect": "off", // Conditional expect is the point of type-narrowing tests
    "eslint/no-await-in-loop": "off", // Sequential awaits are intended in ordered test assertions

    // TypeScript noise rules
    "typescript/no-misused-spread": "off", // Spread-of-string is intentional in numeric counters
    "typescript/consistent-return": "off", // False positive on useEffect cleanup pattern

    // Disabled noise rules (conflict with modern React/Next.js practices)
    "react/react-in-jsx-scope": "off", // Obsolete since the JSX transform (React 17+)
    "react/jsx-props-no-spreading": "off", // Canonical for motion wrapper components
    "import/no-named-export": "off", // Named exports are idiomatic for tree-shaking
    "import/prefer-default-export": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/no-unassigned-import": "off", // CSS side-effect imports are valid
  },
  ignorePatterns: [
    "dist/**",
    "build/**",
    ".next/**",
    "snapshots/**",
    "__screenshots__/**",
    "node_modules/**",
    "out/**",
    "next.config.js",
    "next.config.ts",
  ],
  settings: {
    shadcn: {
      ui: "@/components/ui",
    },
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
