/**
 * @author : Austin Ruby, Alex Chao, Ed Greenberg
 * @function : activate extension
 * @changelog : Ed Greenberg, November 5th, 2019, added flexible query file detection
 * @changelog : Alex Chao, Nov. 5th-10th 2019... Lots of changes... server listener added
 * - config file setup command made
 *   - config file option to allow for a longer time for the graphql server to startup
 * - updating variables in the event of changes in the config files
 * @changelog : ## Austin?
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// only needed for creating the config file
const fs = require('fs');

const readFileSendReqAndWriteResponse = require('./modules/client/readFileSendReqAndWriteResponse');
const serverOn = require('./modules/server/serverOn');
const serverOff = require('./modules/server/serverOff');

// require in new function that checks for a running server
const checkForRunningServer = require('./modules/server/checkForRunningServer');

// require in file that finds root directory
const findRootDirectory = require('./modules/client/findRootDirectory');
// require in file that returns entryPoint when given the root path
const parseConfigFile = require('./modules/client/parseConfigFile');

// functionality that prints the entire GraphQL schema to the output channel
const showGraphqlSchema = require('./modules/client/showGraphqlSchema');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // * These are some variables that I need to pass between different commands, so they're in
  // * a higher scope
  // this ChannelRef variable will be used to pass the output channel between separate function defs
  // let graphQuillChannelRef: vscode.OutputChannel;
  const gqChannel = vscode.window.createOutputChannel('GraphQuill');

  // a toggle variable that will is true when the server is on
  let isOnToggle = false;

  // a disposable variable to get rid of the save event listener
  let saveListener: vscode.Disposable;

  // set rootPath and entryPoint to a string of the path to the server startup file (has app.listen)
  const rootPath = findRootDirectory();

  // putting these variables in the global scope with the expectation that they will be set upon
  // activating the extension. I'm moving them to be able to manage "live" changes
  let entryPoint: string;
  let allowServerTimeoutConfigSetting: number;
  let portNumber: number; // portNumber will also come from the config file


  // boolean to track if the server has been successfully turned on by the user
  let serverTurnedOnByGraphQuill = false;

  /** **********************************************************************************************
   * * The command must be defined in package.json under contributes/commands AND activation events
   * Now provide the implementation of the command with registerCommand
   * The commandId parameter must match the command field in package.json
   * * This is the first GraphQuill option in the command palette for activating GraphQuill
  *********************************************************************************************** */
  const disposableActivateGraphQuill = vscode.commands.registerCommand('extension.activateGraphQuill', async () => {
    if (isOnToggle) {
      // if server is already running, break out of function by returning null
      console.log('Server is already running');
      vscode.window.showInformationMessage('GraphQuill is already active');
      return null;
    }

    // show output channel, clear any old stuff off of it
    gqChannel.show(true);
    gqChannel.clear();

    // parse the config file
    let parseResult = parseConfigFile(rootPath);
    entryPoint = parseResult.entryPoint; // will return the found entry point or an empty string
    allowServerTimeoutConfigSetting = parseResult.allowServerTimeoutConfigSetting;
    portNumber = parseResult.portNumber; // will return the found port number or zero if not found

    // console.log('parseResults', parseResult);

    // if the entryPoint is falsey, break out and tell the user to create a config file
    if (!entryPoint || !portNumber) {
      gqChannel.append('The config file was not found or had an error, please use the Create GraphQuill Config File Command to make one.');
      // break out of this execution context
      return null;
    }

    // Check ONCE if the port is open (also this does not need the third param)
    // will resolve to a true or false value
    const serverOnFromUser = await checkForRunningServer(portNumber, true);
    // console.log('--serverOnFromUser after once check is:', serverOnFromUser);

    // trigger serverOn if the user does not already have the server running
    if (!serverOnFromUser) {
      // start up the user's server, pass in the gqChannel to log any error messages
      serverOn(entryPoint, gqChannel);

      // give user feedback that server is starting up
      gqChannel.clear();
      gqChannel.append('The server is starting up...\n');

      // await this function that will return true or false based on if the server has been started
      // false: if starting the server is longer than the time allotted in the config file (defaults
      // to 3 seconds)
      serverTurnedOnByGraphQuill = await checkForRunningServer(portNumber,
        // once setting is false, so the returned promise will only resolve when the server has
        // started OR the timeout (next variable or 3sec) is reached
        false,
        // allowServerT.C.S. is either a time in milliseconds that defaults to 3000
        allowServerTimeoutConfigSetting);

      // if it is false, that means there was an error starting the server
      // notify the user & end the thread of execution
      if (!serverTurnedOnByGraphQuill) {
        // console.log('server is taking too long to startup');

        // give feedback to user that port didn't start (and the specified timeout config setting,
        // defaults to 3 seconds)
        gqChannel.clear();
        gqChannel.append(`The server is taking too long to startup (>${(allowServerTimeoutConfigSetting || 3000) / 1000} seconds).\nTo increase this time, update the "serverStartupTimeAllowed" setting in the graphquill.config.js file.`);

        // break out, and just in case I'm going to try to kill the port if it did open
        // otherwise we could get runaway node processes...
        return setTimeout(() => serverOff(portNumber), 5000);
      }
    }

    // if the server is on from either the user or graphquill, continue
    // send first query & setup on save listener
    if (serverOnFromUser || serverTurnedOnByGraphQuill) {
      // update isOnToggle (refers to state of GraphQuill extension running or not)
      isOnToggle = true;

      // get the fileName of the open file when the extension is FIRST fired
      const currOpenEditorPath: string = vscode.window.activeTextEditor!.document.fileName;
      // send that request from the currentopeneditor
      readFileSendReqAndWriteResponse(currOpenEditorPath, gqChannel, portNumber, rootPath);

      // initialize the save listener here to clear the channel and resend new requests
      saveListener = vscode.workspace.onDidSaveTextDocument((event) => {
        // console.log('save event!!!', event);

        // clear the graphQuill channel
        gqChannel.clear();

        // re-parse the config file (in case the user made a change)
        parseResult = parseConfigFile(rootPath);
        entryPoint = parseResult.entryPoint;
        allowServerTimeoutConfigSetting = parseResult.allowServerTimeoutConfigSetting;
        portNumber = parseResult.portNumber;

        if (!entryPoint) {
          gqChannel.append('The config file was not found, please use the Create GraphQuill Config File Command to make one.');
          // break out of this execution context
          return null;
        }

        // send the filename and channel to the readFileSRAWR function
        readFileSendReqAndWriteResponse(event.fileName, gqChannel, portNumber, rootPath);

        // satisfying linter
        return null;
      });
    }

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
      vscode.window.showInformationMessage('GraphQuill is already off');

      return null;
    }

    // change toggle boolean
    isOnToggle = false;

    // dispose of the onDidSaveTextDocument event listener
    if (saveListener) saveListener.dispose();

    // close/hide GraphQuill channel
    gqChannel.hide();
    gqChannel.clear();

    console.log('in deactivate, the server turned on by graphquill boolean is: ', serverTurnedOnByGraphQuill);
    // invoke server off in this function
    return setTimeout(() => (serverTurnedOnByGraphQuill && serverOff(portNumber)), 1);
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
      // console.log('--toggle starting extension');
      // using the built in execute command and passing in a string of the command to trigger
      vscode.commands.executeCommand('extension.activateGraphQuill');
    } else {
      // console.log('--toggle stopping the extension');
      vscode.commands.executeCommand('extension.deactivateGraphQuill');
    }

    // just to make the linter happy...
    return null;
  });

  // push it to the subscriptions
  context.subscriptions.push(disposableToggleGraphQuill);

  /** **************************************************************************
   * * Fourth GraphQuill option in command palette to CREATE A CONFIG FILE
   ************************************************************************** */
  const disposableCreateConfigFile = vscode.commands.registerCommand('extension.createConfigFile', () => {
    // console.log('--config file setup triggered');

    // check if the root directory already has a graphquill.config.json file
    const graphQuillConfigPath = `${rootPath}/graphquill.config.js`;
    if (fs.existsSync(graphQuillConfigPath)) {
      vscode.window.showInformationMessage(`A GraphQuill configuration file already exists at ${graphQuillConfigPath}`);
      // exit out
      return null;
    }

    // if it does not already exist, write to a new file
    fs.writeFileSync(graphQuillConfigPath,
      // string to populate the file with
      'module.exports = {\n  // change "./server/index.js" to the relative path from the root directory to\n  // the file that starts your server\n  entry: \'./server/index.js\',\n\n  // change 3000 to the port number that your server runs on\n  portNumber: 3000,\n\n  // to increase the amount of time allowed for the server to startup, add a time\n  // in milliseconds (integer) to the "serverStartupTimeAllowed"\n  // serverStartupTimeAllowed: 5000,\n};\n',
      'utf-8');

    // open the file in vscode
    vscode.workspace.openTextDocument(graphQuillConfigPath).then((doc) => {
      // apparently openTextDocument doesn't mean it's visible...
      vscode.window.showTextDocument(doc);
    });

    return null;
  });

  // push it to the subscriptions
  context.subscriptions.push(disposableCreateConfigFile);

  const disposableShowGraphQLSchema = vscode.commands.registerCommand('extension.showGraphQLSchema', async () => {
    console.log('show schema running');
    // show output channel, clear any old stuff off of it
    gqChannel.show(true);
    gqChannel.clear();

    // parse the config file
    const parseResult = parseConfigFile(rootPath);
    entryPoint = parseResult.entryPoint; // will return the found entry point or an empty string
    allowServerTimeoutConfigSetting = parseResult.allowServerTimeoutConfigSetting;
    portNumber = parseResult.portNumber; // will return the found port number or zero if not found

    // console.log('parseResults', parseResult);

    // if the entryPoint is falsey, break out and tell the user to create a config file
    if (!entryPoint || !portNumber) {
      gqChannel.append('The config file was not found or had an error, please use the Create GraphQuill Config File Command to make one.');
      // break out of this execution context
      return null;
    }

    // Check ONCE if the port is open (also this does not need the third param)
    // will resolve to a true or false value
    const serverOnFromUser = await checkForRunningServer(portNumber, true);
    // console.log('--serverOnFromUser after once check is:', serverOnFromUser);

    // trigger serverOn if the user does not already have the server running
    if (!serverOnFromUser) {
      // start up the user's server, pass in the gqChannel to log any error messages
      serverOn(entryPoint, gqChannel);

      // give user feedback that server is starting up
      gqChannel.clear();
      gqChannel.append('The server is starting up...\n');

      // await this function that will return true or false based on if the server has been started
      // false: if starting the server is longer than the time allotted in the config file (defaults
      // to 3 seconds)
      serverTurnedOnByGraphQuill = await checkForRunningServer(portNumber,
        // once setting is false, so the returned promise will only resolve when the server has
        // started OR the timeout (next variable or 3sec) is reached
        false,
        // allowServerT.C.S. is either a time in milliseconds that defaults to 3000
        allowServerTimeoutConfigSetting);

      // if it is false, that means there was an error starting the server
      // notify the user & end the thread of execution
      if (!serverTurnedOnByGraphQuill) {
        // console.log('server is taking too long to startup');

        // give feedback to user that port didn't start (and the specified timeout config setting,
        // defaults to 3 seconds)
        gqChannel.clear();
        gqChannel.append(`The server is taking too long to startup (>${(allowServerTimeoutConfigSetting || 3000) / 1000} seconds).\nTo increase this time, update the "serverStartupTimeAllowed" setting in the graphquill.config.js file.`);

        // break out, and just in case I'm going to try to kill the port if it did open
        // otherwise we could get runaway node processes...
        return setTimeout(() => serverOff(portNumber), 5000);
      }
    }

    // clear the channel off?
    gqChannel.clear();

    // run required in functionality here?
    showGraphqlSchema(serverOnFromUser, serverTurnedOnByGraphQuill, gqChannel, portNumber);

    // turn the server off if the extension turned it on
    console.log('killing port', serverTurnedOnByGraphQuill, portNumber);
    return setTimeout(() => (serverTurnedOnByGraphQuill && serverOff(portNumber)), 1);
  });

  context.subscriptions.push(disposableShowGraphQLSchema);
}


// this method is called when your extension is deactivated
export function deactivate() {
  // deactivate must return a promise if cleanup operations are async.

  // console.log('---deactive function called!!');

  // executing the deactivateGQ command seems to achieve a similar effect & is nice because it has
  // access to the portNumber variable
  vscode.commands.executeCommand('extension.deactivateGraphQuill');
}
