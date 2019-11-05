// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// const fs = require('fs');
const childProcess = require('child_process');

// spawn a new child process that will be used to close the open port
const terminal2 = childProcess.spawn('bash');

// I'm expecting the portNumber to be parsed off somewhere upsteam ot know which port of
// localhost to query in the extension.ts. For now it will default to 3000.
const serverOff = (portNumber: Number = 3000) => {
  // write any data/outputs from the terminal to the extension console
  terminal2.stdout.on('data', (data: Buffer) => {
    console.log(`stdout: ${data}`);
  });

  // on terminal exit, print the exit code
  terminal2.on('exit', (code: Number) => {
    console.log(`child process exited with code ${code}`);
  });

  // Find and kill the port
  // doesn't seem to need to be in a settimeout
  // setTimeout(() => {
  terminal2.stdin.write(`kill $(lsof -t -i:${portNumber})\n`);
  terminal2.stdin.end();
  // }, 1000);

  vscode.window.showInformationMessage('Your local server should be off.');

  // ! All of this functionality is being pulled somewhere else because the PORT # needs to be
  // ! parsed off earlier to query the right localhost#
  // const temp = vscode.window.activeTextEditor!.document.fileName;
  // // this is a blocking (synchronous) call to the active file, populating 'data' as a string
  // const data = fs.readFileSync(temp, 'utf8');

  // // to stop a localhost, we must first identify a port, and 'app.listen(' is
  // // a special string in the active file that is likely to be adjacent to the port number
  // const lookup = data.search(/app.listen\(/);

  // // this next segment is edge case handling for if the port number
  // // is separated from the start parentheses by some number of spaces
  // let disp = 0;
  // while (data[lookup + disp + 11] === ' ') {
  //   disp += 1;
  // }

  // // in target, we slice the port out of the array (offsetting as required by the edge case test)
  // const target = data.slice(lookup + 11 + disp, lookup + 15 + disp);
};

module.exports = serverOff;
