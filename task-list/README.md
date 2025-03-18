## Tasks for a Vite Project

In the example below, we've got separate tasks for linting, testing, building, and serving a Vite app.

The `"group"` property tags the lint task as a build-related task and the test task as a test group task, enabling quick access via **Run Build Task** or **Run Test Task** commands. The build task runs the project's production build (using Vite or `tsc`) and associates the TypeScript problem matcher to catch compile errors.

The development server task runs in the background so you can continue working while it watches for file changes. Marking it with `"isBackground": true` prevents Visual Studio Code from treating it as finished—it will keep running until you terminate it manually.

```json
// .vscode/tasks.json (excerpt)
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint",
      "type": "npm",
      "script": "lint",
      "group": "build", // Allows Run Build Task to trigger lint
      "problemMatcher": ["$eslint-stylish"] // Highlights ESLint errors in Problems pane
    },
    {
      "label": "Test",
      "type": "shell",
      "command": "npm run test", // Or a direct test runner command
      "group": "test", // Allows Run Test Task to trigger tests
      "problemMatcher": [] // (Attach a matcher if test output can be parsed for errors)
    },
    {
      "label": "Build (Frontend)",
      "type": "shell",
      "command": "npm run build", // Runs Vite or tsc build for frontend
      "problemMatcher": ["$tsc"] // Use TypeScript matcher to catch type errors
    },
    {
      "label": "Dev Server (Frontend)",
      "type": "npm",
      "script": "dev", // Launches Vite dev server
      "isBackground": true, // Mark as long-running background task
      "problemMatcher": "$tsc-watch" // Treat TS compile errors during dev
    }
  ]
}
```

### Adding a Backend Server

So, now let's say we _also_ wanted to spin up the backend API. We can add some additional tasks.

```json
// Compound task to run frontend and backend concurrently
{
  "label": "Dev: Full Stack",
  "dependsOn": ["Dev Server (Frontend)", "Dev Server (API)"]
},
// The backend API server task might be defined as:
{
  "label": "Dev Server (API)",
  "type": "shell",
  "command": "nodemon src/server.ts",
  "isBackground": true,
  "problemMatcher": []  // (Use a matcher if you want to capture errors in Problems)
},
// Sequential compound task: lint -> test -> build
{
  "label": "Check & Build All",
  "dependsOn": ["Lint", "Test", "Build (Frontend)"],
  "dependsOrder": "sequence"
  // "Check & Build All" will run Lint, then Test, then Build (Frontend) sequentially
}
```
