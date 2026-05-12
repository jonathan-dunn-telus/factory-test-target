# factory-test-target

A sandbox calculator library used as the smoke-test target for **telus-claude-code-factory**.

## Conventions

- **Language**: Node.js (ESM), no TypeScript
- **Test runner**: `vitest`. Run with `npm test`.
- **Lint**: `eslint`. Run with `npm run lint`.
- **Source layout**: production code in `src/`, tests in `tests/` (mirroring file names with `.test.js` suffix).
- **Style**: ES modules (`import`/`export`), single quotes, semicolons, 2-space indent. The linter enforces these.

## Adding a function

1. Add the function to `src/calculator.js` as a named export.
2. Add tests to `tests/calculator.test.js` — include happy path + at least one edge case.
3. Ensure `npm test` and `npm run lint` both exit 0 before opening a PR.
4. PR description must reference the issue (`Closes #N`).

## Forbidden territory

- Don't add new top-level dependencies without explicit acceptance criteria asking for one.
- Don't restructure `src/` (e.g., splitting calculator.js into multiple files) — keep diffs scoped.
- Don't add TypeScript, JSDoc type annotations, or build tooling. This is intentionally minimal.

## Branching + PR conventions

- Worker branches: `factory/issue-<N>-<short-slug>`
- One PR per issue
- Squash-merge on green CI
