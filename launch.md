# launch.json

- Configures debugging settings for your project.
- Stored in `.vscode/launch.json`.
- Defines how VS Code launches or attaches to your application for debugging.

---

# Basic Structure

- Top-level keys: `"version"` and `"configurations"`.
- `"version"` is usually `"0.2.0"`.
- `"configurations"` is an array of objects, each defining a specific debugging setup.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/src/index.js"
    }
  ]
}
```

---

# Configuration

- `type`: Specifies the debugger (e.g., `"node"`, `"python"`, `"chrome"`).
- `request`: Determines whether to `"launch"` a new process or `"attach"` to an existing one.
- `name`: A descriptive label for the configuration.
- `program`: Entry point file for launch configurations.

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch App",
  "program": "${workspaceFolder}/app.js"
}
```

---

# Debugger Types

- **Node.js:** `"node"` or `"pwa-node"`.
- **Python:** `"python"`.
- **Chrome:** `"pwa-chrome"` for client-side JavaScript.
- **C/C++:** `"cppdbg"`, `"lldb"`.
- **Java:** `"java"`.
- **.NET Core:** `"coreclr"`.

Choose the debugger type based on the language and environment of your project.

---

# Request Options

- `launch`: Starts a new process in debug mode.
- `attach`: Connects to an already running process.

```json
"request": "launch" // Or "attach"
```

Use `"attach"` for debugging long-running servers or processes.

---

# Program, Arguments, and Working Directory

- `program`: Specifies the executable or entry file.
- `args`: Array of command-line arguments.
- `cwd`: Sets the current working directory.

```json
"program": "${workspaceFolder}/src/index.js",
"args": ["--verbose"],
"cwd": "${workspaceFolder}/src"
```

---

# Environment Variables

- `env`: Object to set environment variables.
- `envFile`: Path to a file containing environment variables.

```json
"env": {
  "NODE_ENV": "development",
  "PORT": "3000"
},
"envFile": "${workspaceFolder}/.env"
```

---

# Console Options

- `console`: Controls where output appears.
  - `"integratedTerminal"` (recommended)
  - `"internalConsole"`
  - `"externalTerminal"`

```json
"console": "integratedTerminal"
```

Use the integrated terminal for full interaction and color support.

---

# Pre-Launch and Post-Debug Tasks

- `preLaunchTask`: Run a task before starting the debugger.
- `postDebugTask`: Execute a task after the debugging session ends.

```json
"preLaunchTask": "build",
"postDebugTask": "stop-server"
```

Automate build steps and cleanup tasks with these settings.

---

# Source Maps and Out Files

- `sourceMaps`: Enable mapping between compiled and source code (crucial for TypeScript, Babel, etc.).
- `outFiles`: Glob patterns for locating generated files.

```json
"sourceMaps": true,
"outFiles": ["${workspaceFolder}/dist/**/*.js"]
```

Enable source maps for an easier debugging experience in transpiled languages.

---

# Skip Files

- `skipFiles`: Array of glob patterns to avoid stepping into library code.

```json
"skipFiles": [
  "<node_internals>/**",
  "${workspaceFolder}/node_modules/**"
]
```

Skip over internal or third-party code to focus on your application's logic.

---

# Runtime Executable

- `runtimeExecutable`: Specify a custom executable for your debugging session.

```json
"runtimeExecutable": "/Users/username/.nvm/versions/node/v16.14.0/bin/node"
```

Use this to control which version of Node.js (or another runtime) is used for debugging.

---

# Attach Configuration Specifics

- **For `attach` requests:**
  - `processId`: Use `${command:pickProcess}` for interactive process selection.
  - `port`: Port to connect when debugging remote processes.
  - `address`: Hostname or IP for remote debugging.
  - `restart`: Automatically restart the debug session if needed.
  - `localRoot` & `remoteRoot`: Map source locations for remote debugging.

```json
{
  "type": "pwa-node",
  "request": "attach",
  "name": "Attach to Process",
  "processId": "${command:pickProcess}"
}
```

---

# Server Ready Action

- Automates actions when a server is ready.
- Monitors output for a specific pattern.
- Can open a URL or attach the debugger automatically.

```json
"serverReadyAction": {
  "action": "openExternally",
  "pattern": "listening on port ([0-9]+)",
  "uriFormat": "http://localhost:%s"
}
```

Use this to streamline debugging of web applications that need time to start up.

---

# Compound Configurations

- Define multiple configurations to launch simultaneously.
- Ideal for full-stack debugging (e.g., launching frontend and backend together).

```json
"compounds": [
  {
    "name": "Full Stack Debug",
    "configurations": ["Launch Backend", "Launch Frontend"]
  }
]
```

Compound configurations simplify multi-process debugging by handling multiple launch configurations in one go.

---

# Debug Variables and Advanced Features

- Utilize predefined variables:
  - `${workspaceFolder}`, `${file}`, `${env:VARIABLE_NAME}`, etc.
- Create dynamic and portable configurations.

```json
"program": "${workspaceFolder}/src/index.js",
"env": {
  "NODE_ENV": "${env:NODE_ENV:development}"
}
```
