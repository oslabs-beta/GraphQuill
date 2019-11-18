/**
 * @module : serverOff.ts
 * @author : Ed Greenberg
 * @function : turn off server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const childProcess = require('child_process');


const serverOff = (portNumber: number) => {
  // console.log('in serveroff function file');

  // spawn a new child process that will be used to close the open port
  const terminal2 = childProcess.spawn('bash');

  // // write any data/outputs from the terminal to the extension console
  // terminal2.stdout.on('data', (data: Buffer) => {
  //   console.log(`stdout: ${data}`);
  // });

  // // on terminal exit, print the exit code
  // terminal2.on('exit', (code: Number) => {
  //   console.log(`terminal2 child process exited with code ${code}`);
  // });

  // in the core of our function, we run a special command that finds and kills the port specified
  terminal2.stdin.write(`kill $(lsof -t -i:${portNumber})\n`);

  // end the child process
  terminal2.stdin.end();

  // message to user
  vscode.window.showInformationMessage('GraphQuill server has been turned off.');
};

module.exports = serverOff;
