// app.ts
import express from 'express';

const app = express();
const port = 3000;

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 */

/** @type {Product[]} */
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 50 },
];

/**
 * Finds a product by the given ID.
 * @param {number} id
 * @returns {Product | undefined} The product object if found, otherwise undefined.
 */
function findProduct(id) {
  return products.find((product) => product.id === id);
}

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = findProduct(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.get('/calculate-total', (req, res) => {
  const productIds = (req.query.ids || []).map((id) => parseInt(id));
  let total = 0;

  for (const productId of productIds) {
    const product = findProduct(productId);
    if (product) {
      total += product.price;
    }
  }

  res.json({ total });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
