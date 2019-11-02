/* eslint-disable import/no-unresolved */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const readFileSendReqAndWriteResponse = require('./modules/client/daNasty.js');
const serverOn = require('./modules/server/serverOn.js');
const serverOff = require('./modules/server/serverOff.js');

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
    serverOn().then(() => {
      console.log('serverOn promise resolved');
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
        readFileSendReqAndWriteResponse(currActiveDoc.fileName, gqChannel, serverOff);
      }
    }).catch((err: Error) => console.log(err));
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
