export function add(x, y) {
  return x + y;
}

export function subtract(x, y) {
  return x - y;
}

export function divide(x, y) {
  if (y === 0) {
    throw new Error('Division by zero error');
  }
  return x / y;
}

export function asyncAdd(x, y) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(add(x, y));
    }, 1000);
  });
}

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
