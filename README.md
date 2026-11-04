<div align="center">

# Next.js 16 Template

A starter for Next.js App Router projects: strict TypeScript, type-aware linting, browser tests, and UI primitives that respect reduced motion.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-5-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-12-f69220?logo=pnpm&logoColor=white)](https://pnpm.io)

[![CI](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml/badge.svg)](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml)

</div>

## Quick start

Requires Node.js 24 and pnpm 12.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The app runs on [http://localhost:3000](http://localhost:3000).

## What is included

Every tool below is configured and wired into the scripts. Nothing is listed in `package.json` without a config that uses it.

| Area       | Choice                                         | Config                                  |
| ---------- | ---------------------------------------------- | --------------------------------------- |
| Framework  | Next.js 16 App Router, React 19                | `next.config.ts`                        |
| Rendering  | Cache Components, PPR, partial prefetching     | `next.config.ts`                        |
| Compiler   | React Compiler enabled                         | `next.config.ts`                        |
| Language   | TypeScript 7, ES2024 target, strict mode       | `tsconfig.json`                         |
| Styling    | Tailwind CSS 4, shadcn, CSS variables          | `postcss.config.mjs`, `components.json` |
| Linting    | Oxlint with type-aware rules and shadcn plugin | `oxlint.config.ts`                      |
| Formatting | Oxfmt with sorted imports and Tailwind classes | `.oxfmtrc.json`                         |
| Testing    | Vitest 5 in a real browser                     | `vitest.config.mts`                     |
| Motion     | Motion primitives with reduced-motion support  | `src/lib/motion.tsx`                    |
| Scrolling  | Lenis smooth scroll with a feature flag        | `src/lib/smooth-scroll.tsx`             |
| Themes     | `next-themes` with system default              | `src/lib/providers.tsx`                 |
| Errors     | `neverthrow` for explicit error handling       | lint rules                              |
| Packages   | pnpm with release-age and supply-chain guards  | `pnpm-workspace.yaml`                   |

## Framework and rendering

The template targets the App Router from the start. `next.config.ts` opts into the features that change how pages are built and cached:

```ts
reactCompiler: true,      // React 19 compiler, no manual memoization
cacheComponents: true,    // Cache Components
partialPrefetching: true, // Partial prefetching
experimental: {
  useTypeScriptCli: true, // TypeScript 7 CLI for faster checks
}
```

Cache Components and PPR mean a page can render a static shell and stream dynamic parts later. The starter ships with this on, so the first component you add is already written for that model instead of being retrofitted later.

React Compiler removes the need for `useMemo` and `useCallback` in most cases. The lint config enforces the syntax the compiler supports (`react/unsupported-syntax`).

## TypeScript

`tsconfig.json` is tuned rather than left at the defaults:

- `target: ES2024` and `moduleResolution: bundler`.
- `strict`, plus `noUncheckedIndexedAccess`, `noImplicitOverride` and `noImplicitAny`.
- `verbatimModuleSyntax` so type-only imports are explicit.
- `noEmit` and incremental builds, with type checking delegated to the Next.js and Oxlint pipelines.

Path aliases are available everywhere:

| Alias           | Path               |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@features/*`   | `src/features/*`   |
| `@hooks/*`      | `src/hooks/*`      |
| `@lib/*`        | `src/lib/*`        |
| `@types/*`      | `src/types/*`      |
| `@utils/*`      | `src/utils/*`      |

## Styling

Tailwind 4 runs through PostCSS, so there is no `tailwind.config.ts` to maintain. Tokens, fonts and theme variables live in `src/app/globals.css`.

shadcn is registered in `components.json` with:

- `base-sera` style and `taupe` base colour, using CSS variables.
- Lucide icons.
- The `@lucide-animated`, `@reactbits-starter` and `@reactbits-pro` registries.

The React Bits registries need a licence key. Put it in `.env.local`:

```bash
REACTBITS_LICENSE_KEY=your_key_here
```

Add components with the usual CLI:

```bash
pnpm dlx shadcn@latest add button
```

## Linting with Oxlint

`oxlint.config.ts` is type-aware (`typeAware` and `typeCheck`), so rules can reason about types, not just syntax. It loads the `typescript`, `react`, `nextjs`, `vitest` and `import` plugins, and treats correctness issues as errors.

### shadcn anti-slop rules

The `@shadcn/lint` plugin blocks the patterns that make generated UI look inconsistent:

| Rule                            | What it prevents                                        |
| ------------------------------- | ------------------------------------------------------- |
| `shadcn/no-restyle`             | Rewriting a component's own styles, except for `layout` |
| `shadcn/no-raw-colors`          | Hard-coded colours outside the token system             |
| `shadcn/no-arbitrary-values`    | One-off `[...]` values instead of design tokens         |
| `shadcn/no-inline-styles`       | Inline `style` props                                    |
| `shadcn/no-unknown-classes`     | Class names that do not exist                           |
| `shadcn/require-static-classes` | Dynamically assembled classes that break detection      |

### Code rules that matter

- `typescript/no-explicit-any`: no `any`.
- `typescript/no-non-null-assertion`: no `!`.
- `typescript/consistent-type-assertions` set to `never`: no `as`, except `as const`.
- `eslint/no-restricted-imports` blocks the Pages Router APIs (`next/router`, `next/head`, `next/document`, `next/app`, `next/error`, `next/amp`).
- `no-throw-literal` and `typescript/only-throw-error` push errors toward `neverthrow` results instead of thrown values.
- `eslint/no-unused-vars` removes unused imports automatically when run with `--fix`.

## Formatting with Oxfmt

`.oxfmtrc.json` keeps the diff surface small:

- 100 character lines, 2 space indentation, double quotes, trailing commas.
- Imports sorted by group, with a blank line between groups.
- Tailwind classes sorted inside `class` and `className`, including `clsx`, `cn`, `cva` and `tw` calls.
- `package.json` scripts sorted alphabetically.

`pnpm fmt` writes the changes; `pnpm fmt:check` fails if anything is unformatted.

## Testing with Vitest

Tests run in a real Chromium browser through Playwright, not in a simulated DOM. The defaults are set for CI:

- Browser mode enabled, headless.
- React plugin and `tsconfigPaths` resolution, so `@/` imports work in tests.
- Globals enabled (`describe`, `it`, `expect` without imports).
- Playwright traces retained on failure in CI, off locally.

```bash
pnpm test        # watch mode
pnpm test:agent  # single run, agent-friendly reporter
pnpm test:ui     # Vitest UI
```

## Motion, scrolling and themes

`src/lib/motion.tsx` exports `MotionDiv`, `MotionSection`, `StaggerContainer` and `StaggerItem`, plus shared variants and transitions. A `ReducedMotionProvider` reads `prefers-reduced-motion` through `useSyncExternalStore`, so every primitive switches to a near-instant transition when the user asks for less motion.

`src/lib/smooth-scroll.tsx` mounts Lenis and skips it entirely when `prefers-reduced-motion` is set. It is also behind a flag:

```ts
// src/lib/config.ts
export const features = {
  smoothScroll: true,
};
```

`src/lib/providers.tsx` composes the theme provider (system default, class attribute, no transition on change), the reduced-motion provider and smooth scroll in one place.

## Package management

`pnpm-workspace.yaml` is used as the pnpm settings file:

- `minimumReleaseAge: 4320` (three days) so a freshly published package cannot land in the repo immediately.
- `blockExoticSubdeps` to keep transitive dependencies on the public registry.
- `allowBuilds` limited to `sharp`.
- `overrides` pinning the React type packages.

## Project structure

```text
.
├── .github/workflows/ci.yml
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib
│       ├── config.ts
│       ├── motion.tsx
│       ├── providers.tsx
│       ├── smooth-scroll.tsx
│       └── utils.ts
├── AGENTS.md
├── components.json
├── next.config.ts
├── oxlint.config.ts
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── tsconfig.json
└── vitest.config.mts
```

## Scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Start the development server                   |
| `pnpm build`      | Production build, including type checking      |
| `pnpm start`      | Serve the production build                     |
| `pnpm fmt`        | Format the codebase                            |
| `pnpm fmt:check`  | Fail if anything is unformatted                |
| `pnpm lint`       | Run Oxlint                                     |
| `pnpm lint:agent` | Oxlint with warnings as errors, agent reporter |
| `pnpm lint:fix`   | Apply safe fixes and suggestions               |
| `pnpm lint:ci`    | Oxlint for CI (errors only)                    |
| `pnpm test`       | Vitest in watch mode                           |
| `pnpm test:agent` | Single Vitest run, agent reporter              |
| `pnpm test:ui`    | Open the Vitest UI                             |

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request targeting `main` and every push to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm fmt:check`
3. `pnpm lint:ci`
4. `pnpm build`

The job is named `Format, lint and build`. Make it required in Settings → Branches (or Rulesets) so a pull request cannot merge while it is red.

## Agent workflow

`AGENTS.md` describes how an agent should work in this repository:

1. **Plan** the component tree, deciding what renders on the server and what needs the client.
2. **Implement** in small steps, running the formatter, linter and scoped tests after each one.
3. **Test** the finished feature, then run the full gate before handing it back.

It also lists the code conventions the linter enforces, the path aliases, and where each kind of file belongs.

> [!NOTE]
> The skills listed in `AGENTS.md` are not complete yet. Treat that list as a starting point, not a catalogue. More entries will be added as the workflow matures.

## Renaming the template

> [!TIP]
> **Rename the repository before you build on it.**
>
> On GitHub, open **Settings → General → Repository name**, rename it, and GitHub will redirect the old URL. Update your local remote:
>
> ```bash
> git remote set-url origin https://github.com/<you>/<new-name>.git
> ```
>
> Then update the `"name"` field in `package.json` and the title at the top of this file. If you started from **Use this template**, your repository already has a fresh history with a single commit.

## Before publishing

This template does not ship a `LICENSE` file. Add one that matches how you want others to use your work, and update the author metadata in `src/app/layout.tsx`.
