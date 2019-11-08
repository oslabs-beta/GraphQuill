/**
 * @module : checkForRunningServer.ts
 * @author : Alex Chao
 * @function : uses child process and lsof to check if a port is currently running
 * @param : pass in an instance of a terminal?????
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
// import * as vscode from 'vscode';

// const path = require('path');
// const fs = require('fs');
const childProcess = require('child_process');

// todo remove this rule when the funciton is done...
// eslint-disable-next-line no-unused-vars
const checkForRunningServer = (portNumber: string, once: boolean) => {
  console.log('CHECK FOR RUNNING SERVER IS RUNNINGGGGGG');

  // moved this line into the serverOn file so that each time serverOn is called
  // a new child process is started. This is critical to being able to toggle
  // GraphQuill on and off
  let portOpen = false;
  let allTerminalText: string;
  const bashTerminal = childProcess.spawn('bash');

  // next, we activate two terminal methods to give us
  // feedback on whether we sucessfully used a child process
  // note the Typescript (: any) used to handle unknown data inputs
  bashTerminal.stdout.on('data', (data: Buffer) => {
    // console.log(`--stdout from terminal: ${data}`);
    console.log('terminal has printed some data...');
    allTerminalText = data.toString();
    portOpen = allTerminalText.includes('node');
    // console.log('allterminal text', allTerminalText);
    // console.log('---data type is', data.constructor.name);
  });

  // log what the exit code is in the extension terminal
  bashTerminal.on('exit', (code: Number) => {
    console.log(`checkForRunningServer child process exited with code ${code}`);
    // console.log('--exit code type is', code.constructor.name);
  });

  // just below is the real core of the function, the child process:
  // we write to a new terminal to run the index.js file in the folder specified by base
  // IMPORTANT: code will not run without the '\n' component--the CLI needs this
  // explicit return command
  // // ! ONCE
  // bashTerminal.stdin.write(`lsof -i :${portNumber}\n`);

  return new Promise((resolve) => {
    let numRuns = 0;
    const intervalWriteBash = setInterval(() => {
      bashTerminal.stdin.write(`lsof -i :${portNumber}\n`);
      // console.log('inside promise-- portOpen boolean', portOpen);
      // console.log('inside promise-- allTerminalText', allTerminalText);

      // if the port is open, resolve the promise, return some value...
      if (portOpen) {
        // clear set intervals
        clearInterval(intervalWriteBash);
        // clearInterval(consoleShit);

        // end terminal session
        bashTerminal.stdin.end();

        console.log('port is open!');

        // resolve promise
        // return a confirmed status
        resolve(true);
      }

      // ? This may be unreachable code depending on how the event loop lines up for the on data
      // ? command changing the portOpen variable (i.e. the conditional above for if (portOpen) may
      // ? be triggered without this ever triggereing
      // if once was set to true, we only want to check if the server is "immediately" on, so
      // check if once is true, and numRuns is greater than one, then resolve the promise with
      // the result of portOpen
      if (once && numRuns > 1) {
        console.log('---once conditional triggered, result will be:', portOpen);
        // clear set intervals
        clearInterval(intervalWriteBash);
        // clearInterval(consoleShit);

        // end terminal session
        bashTerminal.stdin.end();

        resolve(portOpen);
      }
      // increment numRuns for the once conditional test
      numRuns += 1;

      // TODO default setTimeout after 2.5 seconds
    }, 200);
  });

  // this message pops up to the user upon completion of the command
};

module.exports = checkForRunningServer;
