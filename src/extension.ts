/**
 * @author : Austin Ruby, Alex Chao, Ed Greenberg
 * @function : activate extension
 * @changelog : Ed Greenberg, November 5th, 2019, added flexible query file detection
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

/* eslint-disable import/no-unresolved */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');

const readFileSendReqAndWriteResponse = require('./modules/client/readFileSendReqAndWriteResponse.js');
const serverOn = require('./modules/server/serverOn.js');
const serverOff = require('./modules/server/serverOff.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "graphquill" is now active!\n');

  let graphQuillChannelRef: vscode.OutputChannel;

  // * These are some variables that I need to pass between different commands, so they're in
  // * a higher scope
  // a toggle variable that will is true when the server is on
  let isOnToggle = false;
  // a disposable variable to get rid of the save event listener
  let saveListener: vscode.Disposable;

  /** *****************************************************************************************
   * * The command must be defined in package.json under contributes/commands AND activation events
   * Now provide the implementation of the command with registerCommand
   * The commandId parameter must match the command field in package.json
   * * This is the first GraphQuill option in the command palette for activating GraphQuill
  ******************************************************************************************** */
  const disposableActivateGraphQuill = vscode.commands.registerCommand('extension.activateGraphQuill', () => {
    if (isOnToggle) {
      // if server is already running, break out of function by returning null
      console.log('Server is already running');
      return null;
    }

    serverOn().then(() => {
      isOnToggle = true;
      console.log('serverOn promise resolved');
      // create GraphQuill output channel and show it
      const gqChannel = vscode.window.createOutputChannel('GraphQuill');
      gqChannel.show(true);

      graphQuillChannelRef = gqChannel;
      // console.log('--channel type is', gqChannel, typeof gqChannel, gqChannel.constructor.name);

      // // identify current document
      // const currOpenEditor = vscode.window.activeTextEditor;
      // const currActiveDoc: vscode.TextDocument | undefined = currOpenEditor
      //   ? currOpenEditor.document
      //   : undefined;
      // if (currActiveDoc) {
      //   // initailize the saveListener to a variable so it can be disposed of later
      //   saveListener = vscode.workspace.onDidSaveTextDocument((event) => {
      //     // use this event argument to call to pass the filename into another call of readFile
      //     console.log('save event!!!!!', event);
      //   });
      //   readFileSendReqAndWriteResponse(currActiveDoc.fileName, gqChannel);

      // identify file where queries are present

      let currOpenEditor: string = vscode.window.activeTextEditor!.document.fileName;
      let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
      while (!fs.existsSync(`${root}/package.json`)) {
        root = path.dirname(root);
      }
      const stuff = `${root}/graphquill.config.json`;
      if (fs.existsSync(stuff)) {
        currOpenEditor = `${root + JSON.parse(fs.readFileSync(stuff, 'utf8')).entry}`;
      }

      readFileSendReqAndWriteResponse(currOpenEditor, gqChannel, serverOff);
    }).catch((err: Error) => console.log(err));

    // to satisfy typescript linter...
    return null;
  });

  // push it to the subscriptions
  context.subscriptions.push(disposableActivateGraphQuill);


  /** **************************************************************************
   * * Second GraphQuill option in the command palette (Cmd Shift P) for deactivating graphquill
  ************************************************************************** */
  const disposableDisableGraphQuill = vscode.commands.registerCommand('extension.deactivateGraphQuill', () => {
    // console.log('--deactivate functionality triggered');

    // check isontoggle boolean
    if (!isOnToggle) {
      // server is already off
      console.log('server is already off');
      return null;
    }

    console.log('--deactivate graphquill triggered');

    // change toggle boolean
    isOnToggle = false;

    // dispose of the onDidSaveTextDocument event listener
    if (saveListener) saveListener.dispose();

    // close/hide GraphQuill channel
    graphQuillChannelRef.dispose();

    // invoke server off in this function
    return setTimeout(() => serverOff(3000), 1);
  });

  // push it into the subscriptions
  context.subscriptions.push(disposableDisableGraphQuill);


  /** **************************************************************************
   * * Third GraphQuill option in command palette to toggle graphquill extension
   ************************************************************************** */
  const disposableToggleGraphQuill = vscode.commands.registerCommand('extension.toggleGraphQuill', () => {
    // console.log('--toggle triggered!');

    // if the toggle boolean is false, then start the extension, otherwise end it...
    if (!isOnToggle) {
      console.log('--toggle starting extension');
      // using the built in execute command and passing in a string of the command to trigger
      vscode.commands.executeCommand('extension.activateGraphQuill');
    } else {
      console.log('--toggle stopping the extension');
      vscode.commands.executeCommand('extension.deactivateGraphQuill');
    }

    // just to make the linter happy...
    return null;
  });

  // push it to the descriptions
  context.subscriptions.push(disposableToggleGraphQuill);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // deactivate must return a promise if cleanup operations are async.
  // turn the server off if vscode is closed (tested via lsof in terminal)

  // TODO pass in port number variable here (may need to use a global variable to
  // TODO  pass it down to this function)
  console.log('---deactive function called!!');
  return setTimeout(() => serverOff(3000), 1);
}
