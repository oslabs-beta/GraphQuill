/**
 * @module : serverOn.ts
 * @author : Ed Greenberg
 * @function : turn on server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');

const terminal = childProcess.spawn('bash');

const serverOn = () => {
  // we find the root directory by looking up from the active file
  // ...until we detect a folder with package.json
  let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
  while (!fs.existsSync(`${root}/package.json`)) {
    root = path.dirname(root);
    console.log('a root grows: ', root);
  }

  // next, we activate two terminal methods to give us
  // feedback on whether we sucessfully used a child process
  // note the Typescript (: any) used to handle unknown data inputs
  terminal.stdout.on('data', (data: any) => {
    console.log(`stdout: ${data}`);
  });

  terminal.on('exit', (code: any) => {
    console.log(`child process exited with code ${code}`);
  });

  // just below is the real core of the function, the child process:
  // we write to a new terminal to run the index.js file in the folder specified by base
  // IMPORTANT: code will not run without the '\n' component--the CLI needs this
  // explicit return command
  return new Promise((resolve) => {
    console.log('inside promise');
    setTimeout(() => {
      console.log('root: ', root);
      console.log('Sending stdin to terminal');

      // this seems to take some time to spin up the server and
      // throws an error with the timing of a fetch
      terminal.stdin.write(`node ${root}/server/index.js\n`);
      console.log('Ending terminal session');
      terminal.stdin.end();
      resolve();
      console.log('just resolved');
      vscode.window.showInformationMessage('Your local server should be on.');
    }, 1000);
  });

  // this message pops up to the user upon completion of the command
};

module.exports = serverOn;
