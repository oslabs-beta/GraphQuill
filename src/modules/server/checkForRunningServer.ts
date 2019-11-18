/**
 * @module : checkForRunningServer.ts
 * @author : Alex Chao, Nov 7th, 2019
 * @function : uses child process and lsof to check if a port is currently running
 * @param : portNumber, string
 * @param : once: boolean, true if the function should check if the port is open right when the
 * function is run. OR false if the function should wait for the server to start before resolving
 * @param : allowServerTimeoutConfigSetting: number, user input from config file to determine how
 * long to wait for the server to start. Defaults to 3000 (milliseconds)
 * @returns : a boolean, true if the server has started, false if it has not started
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
// import * as vscode from 'vscode';

// const path = require('path');
// const fs = require('fs');
const childProcess = require('child_process');

const checkForRunningServer = (
  portNumber: number,
  once: boolean,
  allowServerTimeoutConfigSetting = 3000,
) => {
  // console.log('CHECK FOR RUNNING SERVER IS RUNNINGGGGGG');
  // console.log(portNumber, once, allowServerTimeoutConfigSetting);
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
    // console.log('terminal has printed some data...');
    allTerminalText = data.toString();
    portOpen = allTerminalText.includes('node');
    // console.log('allterminal text', allTerminalText);
    // console.log('---data type is', data.constructor.name);
  });

  // log what the exit code is in the extension terminal
  // bashTerminal.on('exit', (code: Number) => {
  //   console.log(`checkForRunningServer child process exited with code ${code}`);
  //   console.log('--exit code type is', code.constructor.name);
  // });

  // just below is the real core of the function, the child process:
  // checks if the port is active with the `lsof -i :${portNumber}\n` command
  // IMPORTANT: code will not run without the '\n' component--the CLI needs this
  return new Promise((resolve) => {
    let numRuns = 0;
    let timeoutId: NodeJS.Timer;
    // A set interval callback that will write a command to the terminal every 200ms, then check
    // if the portOpen boolean has been changed (it is actually changed in the on-data listener
    // above). Promise will resolve when the portOpen variable is true
    const intervalLsofToBash = setInterval(() => {
      // console.log('in interval ', portNumber);
      bashTerminal.stdin.write(`lsof -i :${portNumber}\n`);
      // console.log('inside promise-- portOpen boolean', portOpen);
      // console.log('inside promise-- allTerminalText', allTerminalText);

      // if the port is open, resolve the promise, return some value...
      if (portOpen) {
        // clear set intervals
        clearInterval(intervalLsofToBash);

        // clear the timeoutId
        if (timeoutId) clearTimeout(timeoutId);

        // end terminal session
        bashTerminal.stdin.end();

        // console.log('port is open!');

        // resolve promise
        // return a confirmed status
        resolve(true);
      }

      // if once param was set to true, we only want to check if the server is "immediately" on, so
      // check if once is true, and numRuns is greater than one, then resolve the promise with the
      // result of portOpen
      if (once && numRuns > 1) {
        // console.log('---once conditional triggered, result is:', portOpen);
        // clear set intervals
        clearInterval(intervalLsofToBash);

        // clear the timeoutId
        if (timeoutId) clearTimeout(timeoutId);

        // end terminal session
        bashTerminal.stdin.end();

        resolve(portOpen);
      }

      // increment numRuns for the once conditional test
      numRuns += 1;
    }, 200); // Run every 200ms

    // default/base case to resolve promise if the server hasn't started in 3 seconds
    // This means the server is either spinning up too slowly or there is an error in the user's
    // server starting file. In either case we want to return false
    if (!once) {
      // only create this default timeout if this function was invoked with once === false
      timeoutId = setTimeout(() => {
        // console.log('timeout of checkForRunningServer');
        // clear set intervals
        clearInterval(intervalLsofToBash);

        // end terminal session
        bashTerminal.stdin.end();

        // resolve the promise
        resolve(false);
      }, allowServerTimeoutConfigSetting); // default allowed time is 3 sec.
    }
  });
};

module.exports = checkForRunningServer;
