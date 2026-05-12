## Add input validation to all arithmetic functions

Currently `add('1', 2)` silently returns `'12'` because of JS coercion. Add type validation to every function in `src/calculator.js` so non-number inputs throw a clear error.

### Acceptance criteria

1. Each of `add`, `subtract`, `multiply`, `divide` (existing) throws `TypeError('Both arguments must be numbers')` if either argument is not a `number` (per `typeof`).
2. `NaN` is still acceptable input (it's a number — propagate it through normally).
3. New tests verify the throw for each function with at least one bad-input case (e.g., string, undefined, null, object).
4. Existing tests continue to pass.
5. `npm test` exits 0.
6. `npm run lint` exits 0.

### Why

Silent type coercion bugs are the most common production issue for utility libraries. Failing fast on bad input is preferable to silently returning nonsense.

### Note

This change is intentionally scoped to `add`/`subtract`/`multiply`/`divide`. If you add `power` (#1) or `mod` (#2) before or during this work, also add the validation to those. If those don't exist yet, do NOT pre-add them — that's scope creep.
