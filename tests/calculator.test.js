import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, power } from '../src/calculator.js';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  it('adds negatives', () => {
    expect(add(-2, -3)).toBe(-5);
  });
});

describe('subtract', () => {
  it('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });
});

describe('multiply', () => {
  it('multiplies two numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });
  it('returns 0 for any multiplication by 0', () => {
    expect(multiply(0, 42)).toBe(0);
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    expect(divide(20, 4)).toBe(5);
  });
  it('throws on division by zero', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });
});

describe('power', () => {
  it('raises a positive base to a positive exponent', () => {
    expect(power(2, 3)).toBe(8);
  });
  it('returns 1 when exponent is 0', () => {
    expect(power(5, 0)).toBe(1);
  });
  it('returns a fraction for a negative exponent', () => {
    expect(power(2, -1)).toBe(0.5);
  });
  // 0 ** 0 evaluates to 1 in JS — matches the `**` operator semantics.
  it('returns 1 for power(0, 0) (matches JS ** semantics)', () => {
    expect(power(0, 0)).toBe(1);
  });
});
