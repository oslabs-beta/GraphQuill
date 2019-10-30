// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// eslint-disable-next-line import/no-unresolved
const readFileSendReqAndWriteResponse = require('./modules/client/daNasty.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "graphquill" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('extension.graphQuill', () => {
    // create GraphQuill output channel and show it
    const gqChannel = vscode.window.createOutputChannel('GraphQuill');
    gqChannel.show(true);

    // const dummyTextDoc: vscode.TextDocument = {'dummy'};

    // identify current document
    const currOpenEditor = vscode.window.activeTextEditor;
    const currActiveDoc: vscode.TextDocument | undefined = currOpenEditor
      ? currOpenEditor.document
      : undefined;
    if (currActiveDoc) {
      readFileSendReqAndWriteResponse(currActiveDoc.fileName, gqChannel);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
