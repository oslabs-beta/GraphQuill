/**
 * @module : serverOff.ts
 * @author : Ed Greenberg
 * @function : turn off server
 * @changelog : Ed Greenberg, November 5th, 2019, rewrote to open port on server/index.js
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// spawn a new child process that will be used to close the open port

const serverOff = (portNumber: string) => {
  console.log('in serveroff function file');
  // this one also had to be pulled into serverOff so that a new child process is started to
  // kill the server port
  const terminal2 = childProcess.spawn('bash');

  // we find the root directory by looking up from the active file
  // ...until we detect a folder with package.json
  let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
  while (!fs.existsSync(`${root}/package.json`)) {
    root = path.dirname(root);
    console.log('a root grows: ', root);
  }

  // const temp = vscode.window.activeTextEditor!.document.fileName;

  // write any data/outputs from the terminal to the extension console
  terminal2.stdout.on('data', (data: Buffer) => {
    console.log(`stdout: ${data}`);
  });

  // on terminal exit, print the exit code
  terminal2.on('exit', (code: Number) => {
    console.log(`terminal2 child process exited with code ${code}`);
  });

  // // this is a blocking (synchronous) call to the active file, populating 'data' as a string
  // const data = fs.readFileSync(`${root}/server/index.js`, 'utf8');

  // // to stop a localhost, we must first identify a port, and 'app.listen(' is
  // // a special string in the active file that is likely to be adjacent to the port number
  // const lookup = data.search(/app.listen\(/);

  // // this next segment is edge case handling for if the port number
  // // is separated from the start parentheses by some number of spaces
  // let displace = 0;
  // while (data[lookup + displace + 11] === ' ') {
  //   displace += 1;
  // }

  // // in target, we slice the port out of the array (offsetting as required by the edge case test)
  // // eslint-disable-next-line no-unused-vars
  // const target = data.slice(lookup + 11 + displace, lookup + 15 + displace);

  // ? I don't think these need to be delayed... just kill the process
  // in the core of our function, we run a special command that finds and kills the port specified
  // setTimeout(() => {
  // terminal2.stdin.write(`kill $(lsof -t -i:${target})\n`);
  terminal2.stdin.write(`kill $(lsof -t -i:${portNumber})\n`);
  terminal2.stdin.end();
  // }, 1);

  vscode.window.showInformationMessage('GraphQuill has been turned off');
};

module.exports = serverOff;
