/**
 * Adds two numbers.
 *
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @returns {number} The sum of x and y.
 */
export function add(x, y) {
  return x + y;
}

/**
 * Subtracts the second number from the first.
 *
 * @param {number} x - The number from which to subtract.
 * @param {number} y - The number to be subtracted.
 * @returns {number} The result of subtracting y from x.
 * @throws {Error} If y is greater than x, an error is thrown.
 */
export function subtract(x, y) {
  return x - y;
}

/**
 * Divides two numbers and returns the quotient.
 *
 * @param {number} x - The dividend.
 * @param {number} y - The divisor.
 * @throws {Error} If the divisor is 0, throwing a "Division by zero error".
 * @returns {number} The result of dividing x by y.
 */
export function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by zero error');
  }
  return x / y;
}

/**
 * Asynchronously adds two numbers after a 1-second delay.
 *
 * @param {number} x - The first number to add.
 * @param {number} y - The second number to add.
 * @returns {Promise<number>} A promise that resolves with the sum of x and y.
 */
export function asyncAdd(x, y) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(add(x, y));
    }, 1000);
  });
}

/**
 * Asynchronously subtracts the second number from the first.
 *
 * This function returns a promise that resolves with the result of subtracting y from x.
 * If x is less than y, the promise is rejected with an error indicating that the result would be negative.
 *
 * @function asyncSubtract
 * @param {number} x - The number from which to subtract.
 * @param {number} y - The number to be subtracted.
 * @returns {Promise<number>} A promise that resolves with the result of the subtraction.
 * @throws {Error} If x is less than y, the promise is rejected with an error stating "Result would be negative".
 */
export function asyncSubtract(x, y) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x < y) {
        return reject(new Error('Result would be negative'));
      }
      resolve(subtract(x, y));
    }, 1500);
  });
}
