/* eslint-disable */
/**
 * @module : checkForRunningServer.ts
 * @author : Alex Chao
 * @function : uses child process and lsof to check if a port is currently running
 * @param : pass in an instance of a terminal?????
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// const path = require('path');
// const fs = require('fs');
const childProcess = require('child_process');


const checkForRunningServer = (portNumber: string, once: boolean) => {
  // moved this line into the serverOn file so that each time serverOn is called
  // a new child process is started. This is critical to being able to toggle
  // GraphQuill on and off
  let allTerminalText: string;
  const terminal = childProcess.spawn('bash');

  // next, we activate two terminal methods to give us
  // feedback on whether we sucessfully used a child process
  // note the Typescript (: any) used to handle unknown data inputs
  terminal.stdout.on('data', (data: Buffer) => {
    console.log(`stdout from terminal: ${data}`);
    allTerminalText = data.toString();
    // console.log('---data type is', data.constructor.name);
  });

  // log what the exit code is in the extension terminal
  terminal.on('exit', (code: Number) => {
    console.log(`child process exited with code ${code}`);
    // console.log('--exit code type is', code.constructor.name);
  });

  // just below is the real core of the function, the child process:
  // we write to a new terminal to run the index.js file in the folder specified by base
  // IMPORTANT: code will not run without the '\n' component--the CLI needs this
  // explicit return command
  return new Promise((resolve) => {
    setInterval(() => console.log('inside promise-- all terminal text', allTerminalText), 50);
    setTimeout(() => {
      // console.log('root: ', root);
      console.log('Sending stdin (node command) to terminal');

      // this seems to take some time to spin up the server and
      // throws an error with the timing of a fetch
      // terminal.stdin.write(`node ${root}/server/index.js\n`);
      // ! terminal.stdin.write(`node ${entryPoint}\n`);
      console.log('Ending terminal session');
      terminal.stdin.end();

      // resolve promise
      resolve();
      console.log('just resolved');

      vscode.window.showInformationMessage('GraphQuill Activated');
    }, 1);
  });

  // this message pops up to the user upon completion of the command
};

module.exports = checkForRunningServer;
