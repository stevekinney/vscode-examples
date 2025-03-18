import { describe, expect, test } from 'vitest';
import { add, asyncAdd, asyncSubtract, divide, subtract } from './math';

describe('Math Functions', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
  });

  describe('subtract', () => {
    test('should subtract two numbers', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('should return negative result if subtraction results in negative', () => {
      expect(subtract(4, 10)).toBe(-6);
    });
  });

  describe('divide', () => {
    test('should divide two numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('should throw error when divisor is zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero error');
    });
  });

  describe('asyncAdd', () => {
    test('should asynchronously add two numbers', async () => {
      const result = await asyncAdd(5, 7);
      expect(result).toBe(12);
    });
  });

  describe('asyncSubtract', () => {
    test('should asynchronously subtract two numbers', async () => {
      const result = await asyncSubtract(10, 3);
      expect(result).toBe(7);
    });

    test('should reject when result would be negative', async () => {
      await expect(asyncSubtract(3, 10)).rejects.toThrow('Result would be negative');
    });
  });
});
