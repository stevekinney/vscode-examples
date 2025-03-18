import { asyncAdd, asyncSubtract, divide } from './math.js';

const a = 10;
const b = 0;

try {
  const result = divide(a, b);
  console.log(`Division result: ${result}`);
} catch (err) {
  console.error(`Caught error: ${err.message}`);
}

// Asynchronous addition using a Promise
const sum = await asyncAdd(5, 7);
console.log(`Async sum: ${sum}`);

// Asynchronous subtraction with potential error
asyncSubtract(20, 15)
  .then((result) => {
    console.log(`Async subtract: ${result}`);
  })
  .catch((err) => {
    console.error(`Async subtract error: ${err.message}`);
  });

// A simple timeout to simulate additional asynchronous work
setTimeout(() => {
  console.log('Timeout complete. Exiting...');
}, 2000);
