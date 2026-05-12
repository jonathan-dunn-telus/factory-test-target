## Add a `mod` function with proper negative-number handling

JavaScript's `%` operator returns a result with the same sign as the dividend, which is sometimes surprising. Add a `mod` function that always returns a non-negative result for positive divisors (mathematical modulo).

### Acceptance criteria

1. New named export `mod(a, b)` in `src/calculator.js`.
2. For positive `b`, `mod(a, b)` must always return a value in `[0, b)`.
3. Tests:
   - `mod(10, 3) === 1`
   - `mod(-1, 3) === 2`  (NOT `-1` like `%` would give)
   - `mod(-10, 3) === 2`
   - `mod(0, 3) === 0`
   - `mod(7, 7) === 0`
4. Throws `Error('Division by zero')` when `b === 0` (consistent with `divide`).
5. `npm test` exits 0.
6. `npm run lint` exits 0.

### Why

The `%` operator's sign behavior breaks circular-buffer / wrap-around math. A `mod` that always returns non-negative for positive divisor is what most callers actually want.
