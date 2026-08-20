# Project Guidelines

## Development workflow

1. **Ask questions (optional)**: Asking user questions before coding is better than going blindly. Ask only if there is genuine unknown, not because you have to. Try to find edges cases the user may have forgot and ask about it. Use native `AskUserQuestion` to do so.

2. **System Design**: Before actually coding, you must know what to do and how you do it. Know what is client and what is server. Know how to architecture the component to have best perfs. Invoke new subagent with the `nextjs-architecture` skill to design the implementation tree and generate a blueprint for the actual implementation.

3. **Implementation**: Once user validated the plan and architecture, stick to it and start implementing it.

4. **Lint & Format**: Once done implementing, always run formater with `pnpm fmt`, linter with `pnpm lint:agent`. If fails, find the root cause and fix it. No workarounds. Do not stop until passing.

5. **Testing**: Run tests using `pnpm test:agent`. If user explicitely ask you to test with browser, use `agent-browser` skill. Do not stop until it passes the requirements.

## Global Rules

- Do never fix error by using workarounds. Instead you must find the root cause and fix it even if longer and more difficult.

## React

- **Contexts**: React contexts are exceptions, app should contain no more than one at the root that hold global information such as `auth, theme, user, preferences` and so on. No context for a single feature or just for passing props downward.

## TypeScript

- NEVER use `any`; it defeats the purpose of TypeScript.
- NEVER use type assertions with `as`, except for `as const`.
- NEVER use the non-null assertion operator (`!`); prefer optional chaining (`?.`) or explicit checks.

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

- When user ask you to implement a feature, add page or component, start with system design to find best architecture with `/nextjs-architecture`
- When you need to create a components, use `/react-component`
- When coding advanced react code, use `/vercel-react-best-practices`
- When you need more knowledge about advanced TypeScript tips and best practices, use `/typescript`
- If the user ask for tests, use `/js-testing`
