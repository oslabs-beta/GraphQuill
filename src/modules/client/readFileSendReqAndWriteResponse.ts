// for requiring in .js files
/* eslint-disable import/no-unresolved */

// for vscode module being dumb
/* eslint-disable no-unused-vars */


/**
 * @module : readFileSendReqAndWriteResponse.ts
 * @author : Austin Ruby
 * @function : parse string for instances of 'graphQuill' and extract content
 * within parens immediately following each instance
 * @changelog : Ed Greenberg, November 5th, 2019, copy out boilerplate function invocation
 * to query file if not present
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fetch = require('node-fetch');
const fs = require('fs');

// const checkQueryBrackets = require('./checkQueryBrackets.js');
// const parseQuery = require('./parseQuery.js');
const extractQueries = require('./extractQueries.js');

// checkQueryBrackets used to be here
// parseQuery used to be here
// extractQueries was here

// parent function to read file,
// call helper functions to parse out query string,
// send request to GraphQL API,
// and return response to output channel
function readFileSendReqAndWriteResponse(filePath: string,
  channel: vscode.OutputChannel, callback: any) {

  console.log('inreadFile: ', filePath);
  const copy = fs.readFileSync(filePath).toString();
  if (!copy.includes('function graphQuill')) {
    const newFile = `function graphQuill() {}\n${copy}`;
    fs.writeFileSync(filePath, newFile);
  }

  // read user's file
  fs.readFile(filePath, (err: Error, data: Buffer) => {
    if (err) {
      console.log(err);
    } else {
      // if no error, convert data to string and pass into gQParser to pull out query/ies
      const result: (string | Error)[] = extractQueries(data.toString());

      // send post request to API/graphql

      setTimeout(() => {
        console.log('IN SET TIMEOUT');
        // parse off the extra quotes
        const queryMinusQuotes: string = typeof result[1] === 'string'
          ? result[1].slice(1, result[1].length - 1)
          : 'error';

        console.log('query w/o quotes is', queryMinusQuotes);

        fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryMinusQuotes }),
        }).then((response: any) => {
          console.log('response is', response, typeof response);
          return response.json();
        })
          .then((thing: any) => {
            console.log('printed: ', thing);
            channel.append(`look at this shit: ${JSON.stringify(thing, null, 2)}`); // may need to stringify to send
            channel.show(true);
            callback(); // serverOff
          })
          .catch((error: Error) => {
            callback(); // serverOff
            console.log('fetch catch error: ', error);
          });
      }, 5000);

      // then send response back to vscode output channel
      console.log(result);
      channel.append(`result: ${result}`);
      channel.show(true);
    }
  });
}

// console.log(readFileSendReqAndWriteResponse(`${__dirname}/parseMe.js`))


// console.log(findGQ(longTest));

module.exports = readFileSendReqAndWriteResponse;
