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

const childProcess = require('child_process');


const serverOn = (entryPoint: number, gqChannel: vscode.OutputChannel) => {
  // moved this line into the serverOn file so that each time serverOn is called
  // a new child process is started. This is critical to being able to toggle
  // GraphQuill on and off
  const terminal = childProcess.spawn('bash');

  // data will hold any outputs from the terminal child processes
  terminal.stdout.on('data', (data: Buffer) => {
    // console.log(`stdout from terminal: ${data}`);
    if (data.toString().includes('ERR')) {
      // error was emitted from the bash child process
      // put it onto the channel
      // console.log('NODE ERROR', data.toString());
      gqChannel.append(`\n\nERROR TRYING TO START THE SERVER\n\n${data.toString()}`);
    }
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
      // console.log('Sending stdin (node command) to terminal');
      terminal.stdin.write(`node ${entryPoint}\n`);
      // console.log('Ending terminal session');
      terminal.stdin.end();

      // resolve promise
      resolve();

      // this message pops up to the user upon completion of the command
      vscode.window.showInformationMessage('The GraphQuill server has been started');
    }, 1);
  });
};

module.exports = serverOn;
