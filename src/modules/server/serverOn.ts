/**
 * @module : serverOn.ts
 * @author : Ed Greenberg
 * @function : turn on server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : Alex Chao, November 13th, 2019, error messages from node piped to output channel
 * @changelog : whoever's next...
 * * */


// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// const path = require('path');
// const fs = require('fs');
const childProcess = require('child_process');


const serverOn = (entryPoint: number, gqChannel: vscode.OutputChannel) => {
  // moved this line into the serverOn file so that each time serverOn is called
  // a new child process is started. This is critical to being able to toggle
  // GraphQuill on and off
  const terminal = childProcess.spawn('bash');

  // we find the root directory by looking up from the active file
  // ...until we detect a folder with package.json
  // let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
  // while (!fs.existsSync(`${root}/package.json`)) {
  //   root = path.dirname(root);
  //   console.log('a root grows: ', root);
  // }

  // next, we activate two terminal methods to give us
  // feedback on whether we sucessfully used a child process
  // note the Typescript (: any) used to handle unknown data inputs
  terminal.stdout.on('data', (data: Buffer) => {
    // console.log(`stdout from terminal: ${data}`);
    if (data.toString().includes('ERR')) {
      // error was emitted from the bash child process
      // put it onto the channel
      // console.log('NODE ERROR', data.toString());
      gqChannel.append(`\n\nERROR TRYING TO START THE SERVER\n\n${data.toString()}`);
    }
    // console.log('---data type is', data.constructor.name);
  });

  // log what the exit code is in the extension terminal
  // terminal.on('exit', (code: Number) => {
  //   console.log(`child process exited with code ${code}`);
  //   console.log('--exit code type is', code.constructor.name);
  // });

  // just below is the real core of the function, the child process:
  // we write to a new terminal to run the index.js file in the folder specified by base
  // IMPORTANT: code will not run without the '\n' component--the CLI needs this
  // explicit return command
  return new Promise((resolve) => {
    // console.log('inside promise');
    setTimeout(() => {
      // console.log('root: ', root);
      // console.log('Sending stdin (node command) to terminal');

      // this seems to take some time to spin up the server and
      // throws an error with the timing of a fetch
      // terminal.stdin.write(`node ${root}/server/index.js\n`);
      terminal.stdin.write(`node ${entryPoint}\n`);
      // console.log('Ending terminal session');
      terminal.stdin.end();

      // resolve promise
      resolve();
      // console.log('just resolved');

      vscode.window.showInformationMessage('The GraphQuill server has been started');
    }, 1);
  });

  // this message pops up to the user upon completion of the command
};

module.exports = serverOn;
