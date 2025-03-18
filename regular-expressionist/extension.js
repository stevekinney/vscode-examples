'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');
const vscode = require('vscode');
const evaluateRegularExpression = require('./lib/evaluate-regex.js');

const EXTENSION_ID = 'regularExpressionist';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Register the command
  const openCommand = vscode.commands.registerCommand(`${EXTENSION_ID}.open`, () => {
    openRegularExpressionist(context);
  });

  context.subscriptions.push(openCommand);
}

/**
 * @returns {void}
 */
function deactivate() {}

/**
 * Opens a custom webview panel that acts as our Regex Playground.
 * @param {vscode.ExtensionContext} context
 */
function openRegularExpressionist(context) {
  const panel = vscode.window.createWebviewPanel(
    EXTENSION_ID, // Identifies the type of the webview
    'Regular Expressionist', // Title of the panel
    vscode.ViewColumn.One, // Editor column to show the new webview panel in
    {
      enableScripts: true, // We want to enable JS in the webview
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'lib')] // Restrict the webview to only load resources from the lib directory
    },
  );

  // Set the HTML content for the webview
  panel.webview.html = getWebviewContent();

  // Handle messages from the webview
  panel.webview.onDidReceiveMessage(
    handleWebviewMessage.bind(null, panel),
    undefined,
    context.subscriptions,
  );
}

/**
 * Handles messages received from the webview.
 * @param {vscode.WebviewPanel} panel - The webview panel
 * @param {Object} message - The message received from the webview
 */
function handleWebviewMessage(panel, message) {
  if (message.command === 'evaluateRegex') {
    const { pattern, text, flags } = message;
    const response = evaluateRegularExpression(pattern, text, flags);
    // Send the results back to the webview
    panel.webview.postMessage({ command: 'updateResult', data: response });
  }
}

/**
 * Returns a string of HTML for our webview.
 * @returns {string} The HTML content for the webview
 */
function getWebviewContent() {
  const filePath = join(__dirname, 'lib', 'webview.html');
  return readFileSync(filePath, 'utf8');
}

module.exports = {
  activate,
  deactivate,
};
