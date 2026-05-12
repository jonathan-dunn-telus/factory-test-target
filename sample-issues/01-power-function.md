## Add a `power` function to the calculator

We have `add`, `subtract`, `multiply`, `divide` but no `power`. Add it.

### Acceptance criteria

1. New named export `power(base, exponent)` in `src/calculator.js` that returns `base ** exponent`.
2. Tests in `tests/calculator.test.js`:
   - `power(2, 3) === 8`
   - `power(5, 0) === 1`
   - `power(2, -1) === 0.5`
   - `power(0, 0) === 1` (matches JS `**` semantics — note this in the test comment)
3. `npm test` exits 0.
4. `npm run lint` exits 0.
5. No other files modified.

### Why

Completes the four standard arithmetic operations + exponentiation. Future "scientific calculator" features will build on this.
