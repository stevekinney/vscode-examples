## `launch.json` for Debugging

A potential `launch.json` might look something like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Math Example",
      "program": "${workspaceFolder}/index.js",
      "cwd": "${workspaceFolder}"
    }
  ]
}
```
