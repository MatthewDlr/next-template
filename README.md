<div align="center">

# Next.js 16 Template

**Skip the setup. Keep the standards.**

A Next.js 16 starter with Cache Components, PPR and the React Compiler, behind a toolchain that refuses `any`, `as`, `!` and inconsistent shadcn styling.

[![CI](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml/badge.svg)](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-5-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-12-f69220?logo=pnpm&logoColor=white)](https://pnpm.io)

</div>

## Why this template

`create-next-app` gives you a page and a blank slate. The rest, type-aware linting, browser tests, motion that respects user settings, supply-chain defaults, gets rebuilt by hand on every project.

This repository is that setup finished once:

- **Rules with teeth.** No `any`, no `as`, no `!`, no Pages Router imports, no thrown values when a `Result` will do.
- **Tests in a real browser.** Vitest runs Chromium through Playwright, not a simulated DOM.
- **Interface defaults.** Motion primitives and smooth scrolling that switch themselves off when the user asks for less motion.
- **Fewer surprises.** pnpm refuses packages published in the last three days and blocks exotic subdependencies.

## Quick start

Requires Node.js 24 and pnpm 12.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The environment file is only needed for the React Bits component registries.

## Feature highlights

| Area                      | What you get                                                            |
| ------------------------- | ----------------------------------------------------------------------- |
| **Next.js 16 + React 19** | App Router, Cache Components, PPR, partial prefetching, React Compiler  |
| **TypeScript 7**          | ES2024 target, strict mode, `noUncheckedIndexedAccess`, path aliases    |
| **Tailwind 4 + shadcn**   | CSS-first tokens, `base-sera` style, Lucide icons, component registries |
| **Oxlint**                | Type-aware rules, shadcn anti-slop plugin, banned escape hatches        |
| **Oxfmt**                 | 100 columns, sorted imports, sorted Tailwind classes, sorted scripts    |
| **Vitest 5**              | Chromium via Playwright, headless by default, traces on CI failures     |
| **Motion + Lenis**        | Reduced-motion aware primitives and smooth scroll behind a flag         |
| **pnpm guards**           | Release age, exotic subdependency block, pinned React types             |

## The details

<details>
<summary><strong>Rendering: Cache Components, PPR and the React Compiler</strong></summary>

`next.config.ts` turns on the features that change how the App Router builds and caches:

```ts
reactCompiler: true,
cacheComponents: true,
partialPrefetching: true,
experimental: { useTypeScriptCli: true },
```

Cache Components and PPR let a route render a static shell and stream the dynamic parts. The starter is written for that model, so you do not have to retrofit it later. React Compiler removes most manual memoization, and Oxlint blocks syntax the compiler does not support.

</details>

<details>
<summary><strong>TypeScript: strict by default</strong></summary>

`tsconfig.json` targets ES2024 with `moduleResolution: bundler`, then adds `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride` and `verbatimModuleSyntax`. Type checking runs through the build and through Oxlint, so `pnpm build` fails on a type error.

Aliases are available everywhere:

| Alias           | Path               |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@components/*` | `src/components/*` |
| `@features/*`   | `src/features/*`   |
| `@hooks/*`      | `src/hooks/*`      |
| `@lib/*`        | `src/lib/*`        |
| `@types/*`      | `src/types/*`      |
| `@utils/*`      | `src/utils/*`      |

</details>

<details>
<summary><strong>Styling: Tailwind 4 and shadcn</strong></summary>

There is no `tailwind.config.ts`. Tailwind 4 runs through PostCSS and reads its tokens from `src/app/globals.css`, which also defines the theme variables.

`components.json` sets the shadcn style to `base-sera` with the `taupe` base colour, CSS variables and Lucide icons. Three registries are registered: `@lucide-animated`, `@reactbits-starter` and `@reactbits-pro`.

The React Bits registries need a licence key in `.env.local`:

```bash
REACTBITS_LICENSE_KEY=your_key_here
```

Add a component with:

```bash
pnpm dlx shadcn@latest add button
```

</details>

<details>
<summary><strong>Linting: Oxlint with type awareness and anti-slop rules</strong></summary>

`oxlint.config.ts` enables `typeAware` and `typeCheck`, loads the `typescript`, `react`, `nextjs`, `vitest` and `import` plugins, and treats correctness issues as errors.

The `@shadcn/lint` plugin blocks the shortcuts that make generated UI look inconsistent:

| Rule                            | What it prevents                                        |
| ------------------------------- | ------------------------------------------------------- |
| `shadcn/no-restyle`             | Rewriting a component's own styles, except for `layout` |
| `shadcn/no-raw-colors`          | Hard-coded colours outside the token system             |
| `shadcn/no-arbitrary-values`    | One-off `[...]` values instead of design tokens         |
| `shadcn/no-inline-styles`       | Inline `style` props                                    |
| `shadcn/no-unknown-classes`     | Class names that do not exist                           |
| `shadcn/require-static-classes` | Dynamically assembled classes that break detection      |

The rules that shape the codebase:

- `no-explicit-any`, `no-non-null-assertion`, and type assertions set to `never` (so `as const` is the only allowed assertion).
- `eslint/no-restricted-imports` blocks `next/router`, `next/head`, `next/document`, `next/app`, `next/error` and `next/amp`.
- `no-throw-literal` and `typescript/only-throw-error` push errors toward `neverthrow` results.
- `eslint/no-unused-vars` removes unused imports when you run `pnpm lint:fix`.

</details>

<details>
<summary><strong>Formatting: Oxfmt</strong></summary>

`.oxfmtrc.json` keeps the diff surface small:

- 100 character lines, 2 space indentation, double quotes, trailing commas.
- Imports sorted by group, with a blank line between groups.
- Tailwind classes sorted inside `class` and `className`, including `clsx`, `cn`, `cva` and `tw` calls.
- `package.json` scripts sorted alphabetically.

`pnpm fmt` writes the changes. `pnpm fmt:check` fails if anything is unformatted, which is what CI runs.

</details>

<details>
<summary><strong>Testing: Vitest in a real browser</strong></summary>

Tests run in Chromium through Playwright, not in a simulated DOM:

- Browser mode enabled, headless by default.
- React plugin and `tsconfigPaths`, so `@/` imports resolve in tests.
- Globals enabled, so `describe`, `it` and `expect` need no import.
- Playwright traces retained on failure in CI, off locally.

```bash
pnpm test        # watch mode
pnpm test:agent  # single run, agent-friendly reporter
pnpm test:ui     # Vitest UI
```

</details>

<details>
<summary><strong>Motion, scrolling and themes</strong></summary>

`src/lib/motion.tsx` exports `MotionDiv`, `MotionSection`, `StaggerContainer` and `StaggerItem`, plus shared variants and transitions. A `ReducedMotionProvider` reads `prefers-reduced-motion` through `useSyncExternalStore`, so every primitive switches to a near-instant transition when the user asks for less motion.

`src/lib/smooth-scroll.tsx` mounts Lenis and skips it entirely when reduced motion is requested. It is also behind a flag:

```ts
// src/lib/config.ts
export const features = {
  smoothScroll: true,
};
```

`src/lib/providers.tsx` composes the theme provider (system default, class attribute, no transition on change), the reduced-motion provider and smooth scroll in one place.

</details>

<details>
<summary><strong>Package management: pnpm with supply-chain guards</strong></summary>

`pnpm-workspace.yaml` doubles as the pnpm settings file:

- `minimumReleaseAge: 4320`: a package must be three days old before pnpm installs it.
- `blockExoticSubdeps`: transitive dependencies must come from the public registry.
- `allowBuilds`: only `sharp` may run install scripts.
- `overrides`: the React type packages are pinned.

</details>

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

## Working with an agent

`AGENTS.md` defines the loop: plan the component tree and decide what renders on the server, implement in small steps while running the checks, then test the finished feature. It also lists the conventions the linter enforces and where each kind of file belongs.

> [!NOTE]
> The skills listed in `AGENTS.md` are not complete yet. Treat the list as a starting point, not a catalogue. More entries will be added as the workflow matures.

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
> Then update the `"name"` field in `package.json`, the title at the top of this file, and the metadata in `src/app/layout.tsx`. If you started from **Use this template**, your repository already has a fresh history with a single commit.

## Contributing

Issues and pull requests are welcome. Before opening a pull request, run the same checks as CI:

```bash
pnpm fmt:check
pnpm lint:ci
pnpm build
```

Keep a pull request focused on one change, and describe the behaviour that changed rather than the files you touched.

## License

MIT. See [LICENSE](LICENSE).
