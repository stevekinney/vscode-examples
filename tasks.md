# tasks.json Overview

- Configure tasks to automate workflows.
- Stored in `.vscode/tasks.json` and follows a schema (e.g., `"2.0.0"`).
- Central file to define how VS Code runs your commands.

---

# Task Types

- **Shell Tasks:** Execute commands within a shell (supports shell features and environment variables).
- **Process Tasks:** Spawn processes directly without a shell (faster, less overhead).
- Choose based on the flexibility and requirements of your command.

---

# Basic Task Properties

- `type`: Defines task type (`"shell"` or `"process"`).
- `command`: The command or executable to run.
- `args`: An array of string arguments for the command.
- `options`: Configuration options like `cwd` and environment variables.

```json
{
  "label": "Build Project",
  "type": "shell",
  "command": "npm run build",
  "args": [],
  "options": {
    "cwd": "${workspaceFolder}",
    "env": {
      "NODE_ENV": "development"
    }
  },
  "problemMatcher": "$tsc"
}
```

---

# Task Options

- `cwd`: Sets the current working directory for the task.
- `env`: Defines environment variables for the task process.
- `envFile`: Specifies a file from which to load environment variables.
- `shell`: Customizes the shell used to run the task (executable and arguments).

```json
"options": {
  "cwd": "${workspaceFolder}/src",
  "env": { "NODE_ENV": "development" },
  "shell": {
    "executable": "/bin/zsh",
    "args": ["-l"]
  }
}
```

---

# Presentation Options

- `presentation.reveal`: Controls when the task output is shown (`always`, `silent`, `never`).
- `presentation.focus`: Determines if the terminal should gain focus when the task runs.
- `presentation.panel`: Chooses between shared or dedicated terminal panels.

```json
"presentation": {
  "reveal": "always",
  "focus": false,
  "panel": "shared"
}
```

---

# Background Tasks

- `isBackground`: Marks a task as long-running (e.g., file watchers, servers).
- Integrate with background problem matchers to monitor output without blocking the terminal.

```json
"isBackground": true,
  "background": {
    "activeOnStart": true,
    "beginsPattern": "Watching for file changes...",
    "endsPattern": "Done"
  }
}
```

---

# Task Groups

- Group tasks to designate default behaviors (e.g., build, test).
- Use `"group": "build"` to mark a task as the default build task.

```json
"group": {
  "kind": "build",
  "isDefault": true
}
```

---

# Task Dependencies

- `dependsOn`: Specify an array of tasks that must run before the current task.
- Enables chaining of multiple tasks to form a cohesive workflow.

```json
"dependsOn": ["Clean", "Compile"]
```

---

# Compound Tasks

- Launch multiple tasks simultaneously by defining a compound configuration.
- Useful for starting both frontend and backend services at once.

```json
"compounds": [
  {
    "name": "Full Stack Debug",
    "configurations": ["Launch Backend", "Launch Frontend"]
  }
]
```

---

# Advanced Configurations

- `promptOnClose`: Confirms before terminating running tasks.
- Auto-detection for common tasks (npm, gulp, make, etc.).
- Customize shell settings further using `"options.shell"`.

```json
"promptOnClose": true
```

---

# Example Task Configuration

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Tests",
      "type": "shell",
      "command": "npm test",
      "group": "test",
      "presentation": {
        "reveal": "silent"
      },
      "dependsOn": ["Build"],
      "options": {
        "env": { "NODE_ENV": "test" },
        "cwd": "${workspaceFolder}"
      }
    }
  ]
}
```
