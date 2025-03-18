## Add the Configuration

**Add a debug launch configuration to `.vscode/launch.json`:** If the `.vscode` folder does not exist, create it, and then create the `launch.json` file. But, you should probably just do this from within Visual Studio Code.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Run the application

- In the terminal, run `npm run dev`.
- In the Visual Studio Code Debug view, select "Launch Chrome against localhost" (or "Launch Edge against localhost") and press F5.

## Example Debugging Scenarios

### Debugging `addItem`

- Set a breakpoint inside the `addItem` function.
- Add an item to the list.
- Step through the code and inspect the `newItem`, `items`, and `setItems` variables.

### Debugging `calculateTotal`

- Set a breakpoint inside the `calculateTotal` function.
- Add or remove items to trigger a recalculation.
- Inspect the `sum`, `items`, and `total` variables.

### Debugging `removeItem`

- Set a breakpoint inside of the removeItem function.
- Remove an item from the list.
- Verify the content of the `newItems` array.

### Debugging the `useEffect`

- Set a breakpoint inside of the `useEffect`'s callback function.
- Add or remove items from the list, and verify that the `useEffect` is called.
- Verify that the total is updated correctly.
