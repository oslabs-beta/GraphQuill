// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const path = require('path');
const childProcess = require('child_process');


// I'm assuming that ed will pass in a path here to the entry point
export default function serverOn(entryPointRelative: string = 'index.js'): Promise<void> {
  // moved this line into the serverOn file so that each time serverOn is called
  // a new child process is started. This is critical to being able to toggle
  // GraphQuill on and off
  const terminal = childProcess.spawn('bash');

  // to start the command body, we identify the path of the user's active file
  // note the bang operator, Typescript feature that lets the program handle
  // a variable that could potentially be undefined
  // (without the bang, the file would run locally,
  // but throws an error upon attempt to upload to the VS Code Marketplace)
  const temp = vscode.window.activeTextEditor!.document.fileName;

  // next, we truncate to obtain the folder of the active file;
  // WARNING: for sucess, we must be in the same folder as the server!
  const base = path.dirname(temp);

  // next, we activate two terminal methods to give us
  // feedback on whether we sucessfully used a child process
  // note the Typescript (: any) used to handle unknown data inputs
  terminal.stdout.on('data', (data: Buffer) => {
    console.log(`stdout from terminal: ${data}`);
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
    // console.log('inside promise');
    setTimeout(() => {
      console.log('base directory is: ', base);
      console.log('Sending stdin to terminal');

      // this seems to take some time to spin up the server and
      // throws an error with the timing of a fetch
      terminal.stdin.write(`node ${base}/${entryPointRelative}\n`);

      console.log('Ending terminal session');
      terminal.stdin.end();

      // resolve promise
      resolve();
      console.log('just resolved');

      vscode.window.showInformationMessage('Your local server should be on.');
    }, 1);
  });

  // this message pops up to the user upon completion of the command
}

module.exports = serverOn;
