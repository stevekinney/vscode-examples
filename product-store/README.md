# Exercise: Debugging an Express Application

Set up a `launch.json`.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "args": ["${workspaceFolder}/index.js"]
    }
  ]
}
```

## Debugging `findProduct`

- Set a breakpoint inside the `findProduct` function.
- Make a request to `http://localhost:3000/products/2` or `http://localhost:3000/products/4` (for a not-found scenario).
- Step through the code and inspect the `id` and `product` variables.

## Debugging `calculateTotal`

- Set a breakpoint inside the `calculateTotal` loop.
- Make a request to `http://localhost:3000/calculateTotal?ids=1&ids=3`.
- Inspect the `productIds`, `total`, and `product` variables.
- Make a request that contains an invalid product id, and verify that the product is then undefined, and the total is not affected.

## Debugging the Express route

- Set a breakpoint on the line containing `res.json(product);` to verify that the correct json is being sent.
- Set a breakpoint on the line containing `res.status(404).send('Product not found');` to verify that the 404 error is being sent when appropriate.
