// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fs = require('fs');
const childProcess = require('child_process');

const terminal2 = childProcess.spawn('bash');

const serverOff = () => {
  const temp = vscode.window.activeTextEditor!.document.fileName;

  terminal2.stdout.on('data', (data: any) => {
    console.log(`stdout: ${data}`);
  });

  terminal2.on('exit', (code: any) => {
    console.log(`child process exited with code ${code}`);
  });

  // this is a blocking (synchronous) call to the active file, populating 'data' as a string
  const data = fs.readFileSync(temp, 'utf8');

  // to stop a localhost, we must first identify a port, and 'app.listen(' is
  // a special string in the active file that is likely to be adjacent to the port number
  const lookup = data.search(/app.listen\(/);

  // this next segment is edge case handling for if the port number
  // is separated from the start parentheses by some number of spaces
  let disp = 0;
  while (data[lookup + disp + 11] === ' ') {
    disp += 1;
  }

  // in target, we slice the port out of the array (offsetting as required by the edge case test)
  const target = data.slice(lookup + 11 + disp, lookup + 15 + disp);

  // in the core of our function, we run a special command that finds and kills the port specified
  setTimeout(() => {
    terminal2.stdin.write(`kill $(lsof -t -i:${target})\n`);
    terminal2.stdin.end();
  }, 1000);

  vscode.window.showInformationMessage('Your local server should be off.');
};

module.exports = serverOff;
