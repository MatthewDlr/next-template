# Project Guidelines

## Tech Stack

- Framework: `NextJS 16 with Cache Component and PPR. React 19 with React Compiler`
- Runtime: `NodeJS 24`
- Target: `ES2024`
- Typing: `TypeScript 7 for native speed`
- Styling: `TailwindCSS 4 with Shadcn`
- Testing: `Vitest 5 with browser mode`
- Linter: `Oxlint`
- Formatter: `Oxfmt`,

## Development Workflow

The first step of the workflow should be `Plan` mode; because before coding, you must know what to do and _how_ you do it. But for simpler tasks or continuing existing work, user may skip this step and jump straight to implementation by using `Build` mode.

### 1. Plan

In `Plan` mode, you need to have a clear idea of what is meant to be built. What components will be client and what will be server; how to architecture the components tree; when the data is going to change.

To do so, load the `/nextjs-architecture` skill to design the implementation tree and generate a blueprint for the actual implementation.
Then the use `/vercel-react-best-practices` skill to refine the architecture verify it follows best practices.
You're answer must include a tree of the components you plan to implement with details about what is client, what is server and where the implementation will leave. The user must approve it before you move to the next step.

### 2. Implement

**Before Starting**
Depending on the task that need to be done, you're expected to fetch relevant skills to master the implementation.
Look at the `Skills` section below for a list of skills you can load to improve your performance and code quality.
The rules in these skills are non negotiable, you must load the ones necessary for the tasks at hand.

You must split the implementation into small, meaningful, and small tasks. Then for each of them:

1. Implement it.
2. Run the checks inline:

   ```bash
   pnpm fmt
   pnpm lint:agent # Run the linter, type checking & shadcn linter
   pnpm test:agent <scoped to affected files> # don't break what already exists
   ```

3. **Loop until green.** Running formatter and linter frequently avoids the accumulation of errors. Adapt your way of coding for the next todos so you don't repeat the same mistakes.
4. Make sure the work is clean: no dead code, unused imports, commented-out code.

**3-strikes escalation:** if the same test still fails after 3 fix attempts, **stop**. Report the failure output, what you tried, and ask the user. Do not grind.

### 3. Testing

When all tasks are implemented, it's time to test the feature.
To do so, it's better to spawn an optimized subagent that will focus on testing the feature, instead of you doing it manually. This way, you can focus on fixing the bugs and improving the implementation.

1. Dispatch the **Test-Engineer** subagent once, passing:
   - the scope (the feature's diff),
   - the plan file (the todos are its intent reference),
   - It's objective of writing meaningful and useful tests,
2. It returns its report: tests written / suspected implementation bugs (expected vs. actual) / deliberately excluded / questions.

3. Then you get the result and fix the reported implementation bugs, if any. You may fix _mechanical_ test issues (imports, fixtures, queries).
4. Run `pnpm test:agent` and loop until green. **3-strikes applies** (3 failed attempts on the same test → stop and ask).
5. Run full gate, once:

   ```bash
   pnpm fmt && pnpm lint:agent && pnpm test:agent
   ```

Then, if user explicitly ask for browser testing, dispatch the **Browser-Engineer** subagent.
It covers two dimensions:

- **behavior verification:** the listed flows and their expected outcomes
- **layout pass:** overlaps, invisible/uncovered elements, misaligned controls, inconsistent spacing, clipped content

Pass it the behaviors, flows, app access, and test data it asks for in its input contract.

## Rules

Set of rules that all agents must follow at all times.

### Global

**Only well-maintained packages**: If a third party lib is needed, use only well-tested, actively maintained packages with decent download counts to avoid maintenance burdens and supply chain security risks. Always ask user confirmation before using a package, along with the ones you considered.

**Error handling**: Handle errors immediately and gracefully. Fail early, fail hard, and return clear, useful error messages to clients.

**Naming**: Names should explain _what_ it does without never saying _how_ it does it ; you should not need comments to understand what something does.

- Components: UserCard, OrderSummary, LoginForm instead of WrapperOrder, Container1 or SubLoginForm.
- Functions: formatCurrency, validateEmail, getUserById instead of handleStuff, getUserFromDb, validateEmailRegex.
- Props: isPaid, hasAccess, canEdit for booleans; avoid ambiguous names like flag, status when they encode multiple meanings.

**Small, single‑responsibility units**: A function, hook, component or module should have one reason to change.

### TypeScript

The `tsconfig.json` has been tailored for this project and should not be changed without user approval.

When importing files, always use the `@/` prefix alias when relevant instead of relative paths. The following aliases are available:

- `@/*`: `./src/*`,
- `@components`: `./src/components/_`,
- `@features`: `./src/features/_`,
- `@hooks`: `./src/hooks/_`,
- `@lib`: `./src/lib/_`,
- `@types`: `./src/types/_`,
- `@utils`: `./src/utils/_`,

NEVER use `any`; it defeats the purpose of TypeScript.
NEVER use type assertions with `as`, except for `as const`.
NEVER use the non-null assertion operator (`!`); prefer optional chaining (`?.`) or explicit checks.

Use `neverthrow` lib for handling errors instead of throwing them

For writing advanced types, gather all best practices and coding guidelines, load the `/typescript` skill.

## React

**Contexts:** React contexts are exceptions, app should contain no more than one at the root that hold global information such as `auth, theme, user, preferences` and so on. No context for a single feature or just for passing props downward. Exceptions for libs like Motion, GSAP, Shadcn that are allowed to spawn their own context.

**Compiler:** React compiler is on in this project, meaning that `useMemo` and `useCallback` becomes hardly necessary.

## Skills

Here's some high quality skills that you can load to improve your performance and code quality. You can load them at any time, but it's recommended to load them before starting the implementation.

- `/react` To correctly understand React, performances, code style, and best practices.
- `/vercel-react-best-practices` React and Next.js performance optimization guidelines from Vercel Engineering.
- `/nextjs-architecture` How to actually write good Nextjs code that embrace latest features and best practices.
- `/vercel-composition-patterns` React composition patterns that scale.
- `/tailwindcss` for correctly using tailwindcss
- `/impeccable` for implementing UI patterns and animations that does not suck.
- `/typescript` for writing advanced types, get guidelines and best practices.
- `/vitest` for writing and auditing integration tests

## Project structure

When you have to decide where to put a file, use the standard Next.js structure:

```md
my-nextjs-app/
├── public/ # Static assets (images, fonts, favicons)
├── src/ # Main source directory
│ ├── app/ # App Router (Pure routing, layouts, & page definitions)
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Homepage
│ │ ├── (auth)/ # Route Group: Auth-related pages (no URL impact)
│ │ │ ├── login/
│ │ │ └── register/
│ │ └── (dashboard)/ # Route Group: Authenticated dashboard
│ │ └── dashboard/
│ ├── components/ # Shared global UI components
│ │ ├── ui/ # Atomic design components (Button, Input, Modal)
│ │ └── layout/ # Shared structure (Navbar, Footer, Sidebar)
│ ├── features/ # Feature-based modules (Domain-driven)
│ │ ├── product-feed/ # Everything isolated for a specific feature
│ │ │ ├── components/ # Feature-specific components
│ │ │ ├── hooks/ # Feature-specific hooks
│ │ │ ├── actions.ts # Next.js Server Actions for this feature
│ │ │ └── types.ts # TypeScript definitions
│ │ └── user-profile/
│ ├── hooks/ # Global custom React hooks
│ ├── lib/ # Third-party SDK initializations (Prisma, Stripe, Supabase)
│ │ └── cache.ts # cacheLife profiles + centralized cacheTag taxonomy
│ ├── types/ # Global TypeScript declarations
│ └── utils/ # Pure utility helper functions
├── .env.local # Environment variables
├── next.config.ts # Next.js configuration (cacheComponents, partialPrefetching)
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration
```

If your or the user ask about where to put a file or how to organize correctly the codebase, fetch the following:
<https://nextjs.org/docs/app/getting-started/project-structure.md>

## Failure Log
