# Regular Expressionist

```js
function openRegularExpressionist(context) {
  const panel = vscode.window.createWebviewPanel(
    'regularExpressionist', // Identifies the type of the webview
    'Regular Expressionist', // Title of the panel
    vscode.ViewColumn.One, // Editor column to show the new webview panel in
    {
      enableScripts: true, // We want to enable JS in the webview
    },
  );

  // Set the HTML content for the webview
  panel.webview.html = getWebviewContent();

  // Listen for messages from the webview
  panel.webview.onDidReceiveMessage(
    (message) => {
      if (message.command === 'evaluateRegex') {
        const { pattern, text, flags } = message;
        const response = evaluateRegularExpression(pattern, text, flags);
        // Send the results back to the webview
        panel.webview.postMessage({ command: 'updateResult', data: response });
      }
    },
    undefined,
    context.subscriptions,
  );
}
```

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
