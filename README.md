<div align="center">

# Next.js 16 Template

**Skip the setup. Keep the standards.**

Opinionated Next.js 16 starter with Cache Components, PPR and the React Compiler

<!-- The CI badge 404s until the repository is public and the workflow has run once.
Restore it on the line below when that is true:
[![CI](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml/badge.svg)](https://github.com/MatthewDlr/next-template/actions/workflows/ci.yml)
-->

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-5-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-12-f69220?logo=pnpm&logoColor=white)](https://pnpm.io)

</div>

## Quick start

Requires Node.js 24 and pnpm 12.

```bash
pnpm install
pnpm dev
```

## Feature Highlights

- ⚡ **Next.js 16 + React 19**: App Router, Cache Components, PPR, partial prefetching and the React Compiler.
- 🛡️ **TypeScript 7**: ES2024 target, strict mode, `noUncheckedIndexedAccess` and path aliases.
- 🎨 **Tailwind 4 + Shadcn**: CSS-first tokens, Lucide icons and shadcn lint rules.
- <img src="https://oxc.rs/logo-without-border.svg" height="14" alt="" /> **Oxlint**: type-aware linting and AI anti-slop rules. 50x to 100x faster than ESLint.
- <img src="https://oxc.rs/logo-without-border.svg" height="14" alt="" /> **Oxfmt**: 100 columns, sorted imports and Tailwind classes, around 30x faster than Prettier.
- <img src="https://vitest.dev/logo-without-border.svg" height="14" alt="" /> **Vitest 5**: the fastest test runner for node.js, with browser mode enabled.
- 🎬 **Motion + Lenis**: reduced-motion aware primitives and smooth scroll behind a flag.
- 🤖 **Agentic Development**: Optimized scripts for AI agents.
- 🔒 **Security**: release age, exotic subdependency block and pinned React types.

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

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request targeting `main` and every push to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm fmt:check`
3. `pnpm lint:ci`
4. `pnpm build`

The job is named `Format, lint and build`. Make it required in Settings → Branches (or Rulesets) so a pull request cannot merge while it is red.

## Agentic Development

Every check has a non-interactive, machine-friendly entry point, so an agent does not have to parse a watch UI or a human report:

- **`AGENTS.md`** defines the loop: plan the component tree and decide what renders on the server, implement in small steps while running the checks, then test the finished feature. It also lists the conventions the linter enforces and where each kind of file belongs.
- **`pnpm lint:agent`** runs Oxlint with `agent` reporter, which returns compact diagnostics instead of the default human format. Oxlint runs with type checking, react rules and the shadcn anti-slop plugin.
- **`pnpm test:agent`** runs Vitest once with the `agent` reporter, built for machine consumption rather than the interactive UI.
- **`pnpm fmt:check`** is the non-interactive formatting check for agents that should not rewrite files.

> [!NOTE]
> The skills and agents listed in `AGENTS.md` are not complete yet and may be released in the future.

## Renaming the template

> [!TIP]
> **Rename the repository before you build on it.**
> Update the `"name"` field in `package.json`, the title at the top of this file, and the metadata in `src/app/layout.tsx`. If you started from **Use this template**, your repository already has a fresh history with a single commit.

## Contributing

Issues and pull requests are welcome. Before opening a pull request, run the same checks as CI:

```bash
pnpm fmt:check
pnpm lint:ci
pnpm build
```

Keep a pull request focused on one change, and describe the behavior that changed rather than the files you touched.

## License

MIT. See [LICENSE](LICENSE).
