import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide, power, mod } from '../src/calculator.js';

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

describe('mod', () => {
  it('returns the positive remainder for a positive dividend', () => {
    expect(mod(10, 3)).toBe(1);
  });
  it('returns a non-negative result for a negative dividend (unlike %)', () => {
    expect(mod(-1, 3)).toBe(2);
  });
  it('wraps a larger negative dividend into [0, b)', () => {
    expect(mod(-10, 3)).toBe(2);
  });
  it('returns 0 when the dividend is 0', () => {
    expect(mod(0, 3)).toBe(0);
  });
  it('returns 0 when a is an exact multiple of b', () => {
    expect(mod(7, 7)).toBe(0);
  });
  it('throws on division by zero', () => {
    expect(() => mod(1, 0)).toThrow('Division by zero');
  });
});

describe('input validation', () => {
  describe('add', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => add('1', 2)).toThrow(TypeError);
      expect(() => add('1', 2)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(add(NaN, 2)).toBeNaN();
    });
  });

  describe('subtract', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => subtract(undefined, 2)).toThrow(TypeError);
      expect(() => subtract(undefined, 2)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(subtract(NaN, 2)).toBeNaN();
    });
  });

  describe('multiply', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => multiply(null, 2)).toThrow(TypeError);
      expect(() => multiply(null, 2)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(multiply(NaN, 2)).toBeNaN();
    });
  });

  describe('divide', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => divide({}, 2)).toThrow(TypeError);
      expect(() => divide({}, 2)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(divide(NaN, 2)).toBeNaN();
    });
  });

  describe('power', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => power('2', 3)).toThrow(TypeError);
      expect(() => power('2', 3)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(power(NaN, 2)).toBeNaN();
    });
  });

  describe('mod', () => {
    it('throws TypeError on non-number input', () => {
      expect(() => mod('10', 3)).toThrow(TypeError);
      expect(() => mod('10', 3)).toThrow('Both arguments must be numbers');
    });
    it('propagates NaN without throwing', () => {
      expect(mod(NaN, 3)).toBeNaN();
    });
  });
});
