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
    suspicious: "warn",
    perf: "warn",
    pedantic: "off",
    style: "off",
  },
  env: {
    browser: true, // Enables web API globals (window, document, fetch)
    builtin: true, // Enables standard JavaScript core globals (Promise, Map, etc.)
    node: true, // Enables Node environment globals (process)
  },
  globals: {},
  rules: {
    /* Shadcn linter rules. See https://github.com/shadcn-ui/lint */
    "shadcn/no-restyle": ["error", { allow: ["layout"] }],
    "shadcn/no-raw-colors": "error",
    "shadcn/no-arbitrary-values": "error",
    "shadcn/no-inline-styles": "error",
    "shadcn/no-unknown-classes": "error",
    "shadcn/require-static-classes": "error",

    /* Enabling back some React rules */
    "react/rules-of-hooks": "error", // Enforce React Hooks to be only called in valid contexts and in the correct order
    "react/unsupported-syntax": "error", // Syntax that React Compiler does not plan to support
    "react/jsx-no-useless-fragment": "error", // Fragments that can be replaced with a single child
    "react/function-component-definition": "error", // Enforce function component definitions to be consistent (arrow functions or function declarations)
    "react/jsx-no-target-blank": "error", // Anchor tags with target="_blank" that do not have rel="noopener noreferrer" for security reasons
    "react/no-unescaped-entities": "error", // Warns on unescaped entities in JSX that can lead to unexpected behavior (e.g., <, >, &, etc.)

    /* Enforce App Router usage and prevent Pages Router usage */
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

    /* Auto remove unused imports */
    "eslint/no-unused-vars": [
      "error",
      {
        fix: {
          imports: "fix",
        },
      },
    ],

    /* Neverthrow */
    "no-throw-literal": "error", // Stop native throws to enforce the neverthrow pattern
    "typescript/only-throw-error": "error", // Only `Error` may be thrown; prefer returning a neverthrow Result

    /* Vitest */
    "vitest/require-mock-type-parameters": "off", // vi.fn() infers from usage/typing; pure friction
    "vitest/valid-title": "off", // `describe(component)` is an idiomatic component-suite convention
    "vitest/no-conditional-expect": "off", // Conditional expect is the point of type-narrowing tests
    "eslint/no-await-in-loop": "off", // Sequential awaits are intended in ordered test assertions

    /* TypeScript */
    "typescript/no-explicit-any": "error", // ban `any` that defeats the purpose of TypeScript
    "typescript/no-non-null-assertion": "error", // Prefer optional chaining or explicit checks over `!`
    "typescript/consistent-type-assertions": ["error", { assertionStyle: "never" }], // Bans `as` (but allows `as const`)
    "typescript/no-misused-spread": "off", // Disable spread-of-string is intentional in numeric counters
    "typescript/consistent-return": "off", // Remove a false positive on useEffect cleanup pattern

    /* Noise rules (conflict with modern React/Next.js practices) */
    "react/react-in-jsx-scope": "off", // Obsolete since the JSX transform (React 17+)
    "react/jsx-props-no-spreading": "off", // Canonical for motion wrapper components
    "import/no-named-export": "off", // Named exports are idiomatic for tree-shaking
    "import/prefer-default-export": "off",
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/no-unassigned-import": "off", // CSS side-effect imports are valid
    "eslint/sort-imports": "off", // Conflicts with Oxfmt's sortImports feature (oxfmt is canonical)
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
