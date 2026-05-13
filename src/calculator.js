function assertNumbers(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
}

export function add(a, b) {
  assertNumbers(a, b);
  return a + b;
}

export function subtract(a, b) {
  assertNumbers(a, b);
  return a - b;
}

export function multiply(a, b) {
  assertNumbers(a, b);
  return a * b;
}

export function divide(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

export function power(base, exponent) {
  assertNumbers(base, exponent);
  return base ** exponent;
}

export function mod(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return ((a % b) + b) % b;
}
