# Project Guidelines

## Development workflow

1. **Ask Questions (optional)**: At all time, you must stop and ask clarifying questions whenever specifications are ambiguous rather than guessing. Ask only if there is genuine unknown details or ambiguities. Once you have everything continue and do not endlessly ask questions. Try to find edges cases the user may have forgot and ask about it. Use native `AskUserQuestion` to do so.

2. **System Design**: Before actually coding, you must know what to do and _how_ you do it. Know what is client and what is server. Know how to architecture the components tree to have best perfs. Know when the data is going to change.
To do so invoke new subagent with the `/nextjs-architecture` skill to design the implementation tree and generate a blueprint for the actual implementation. Then the subagent will use `/vercel-react-best-practices` skill to verify proposed architecture does not go against best practices.

3. **Implementation**: Once user validated the plan and architecture, stick to it and start implementing it.

4. **Lint & Format**: Once done implementing, always run formater with `pnpm fmt` and linter with `pnpm lint:agent`. If fails, find the root cause and fix it. No workarounds. Do not stop until passing.

5. **Testing**: If you're building new feature it might be useful to create new tests with the `/vitest` skill. You may need to ask user wether tests are relevant for the feature you're building. Then, always run tests using `pnpm test:agent` and if user **explicitely** ask you to test visuals or user workflow, use `agent-browser` skill. In any way, do not stop until tests passes the requirements.

6. **Learn**: If user rectify you, spot issue in the process, or suggest workflow improvement, you are allowed to edit this `agent.md` file to take it into account. Below you have the `Failure Log` section where you can write some ahaha moments and learnings to make sure it does not happen again. Make sure this section is never bloated and is kept simple.

## Global Rules

- Do never fix error by using workarounds. Instead you must find the root cause and fix it even if longer and more difficult.

## React

- **Contexts**: React contexts are exceptions, app should contain no more than one at the root that hold global information such as `auth, theme, user, preferences` and so on. No context for a single feature or just for passing props downward.

- **Compiler**: This project use React Compiler, meaning `useMemo` and `useCallback` are hardly needed. If you do need it, it might be smell or poorly written code.

## TypeScript

- NEVER use `any`; it defeats the purpose of TypeScript.
- NEVER use type assertions with `as`, except for `as const`.
- NEVER use the non-null assertion operator (`!`); prefer optional chaining (`?.`) or explicit checks.
- Use `neverthrow` lib for handling errors instead of throwing them

- Use type narrowing for nullable values, such as `if (value !== null && value !== undefined)`.
- Prefer type-first API design and use the `satisfies` operator for validation.
- Use discriminated unions for state machines.
- Use annotated type predicates for narrowing.
- Optimize for type inference.
- Define explicit return types for functions, unless the return type is very basic like `void` or `boolean`.
- Create helper types to build reusable type utilities.
- Document complex types with JSDoc comments.
- Use `never` for exhaustive checks so new union cases fail at compile time.
- Test your types with type tests to verify type behavior.

## Skills

Here's a list of skills you must use when relevant to achieve best code practices

- When user ask you to implement a feature, add page or component, start with system design to find best architecture with `/nextjs-architecture` and best practices with `/vercel-react-best-practices`
- When you need to create a components, use `/react-component`
- When you need more knowledge about advanced TypeScript tips and best practices, use `/typescript`
- If the user ask for unit tests, use `/js-testing`

## Failure Log
