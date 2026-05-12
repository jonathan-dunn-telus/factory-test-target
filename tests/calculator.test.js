import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../src/calculator.js';

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
