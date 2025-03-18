const vscode = require('vscode');

// Step A: Define a decoration type
const decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255, 0, 0, 0.3)', // semi-transparent red
});

// Step B: Function to find and decorate words
function decorateWords() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const matches = [];

  // e.g., highlight 'FIXME'
  const regex = /\bFIXME\b/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    matches.push(new vscode.Range(startPos, endPos));
  }

  // Apply decorations
  editor.setDecorations(decorationType, matches);
}

// Step C: Hook the function into editor/document change events
function subscribeToDocumentChanges(context) {
  // Re-run whenever text changes
  vscode.workspace.onDidChangeTextDocument(() => decorateWords(), null, context.subscriptions);
  // Re-run whenever the active editor changes (switch tabs, etc.)
  vscode.window.onDidChangeActiveTextEditor(() => decorateWords(), null, context.subscriptions);

  // Run at least once on activation
  decorateWords();
}

// This is your extension’s main activation
function activate(context) {
  // Register the decorator logic with events
  subscribeToDocumentChanges(context);
  vscode.commands.registerCommand('extension.decorateWords', () => {
    vscode.window.showInformationMessage('Highlighting words!');
    decorateWords();
  });
}

// export (so VS Code recognizes these functions)
module.exports = {
  activate,
  deactivate: () => {},
};
