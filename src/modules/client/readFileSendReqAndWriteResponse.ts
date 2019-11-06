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
 * @changelog : Alex Chao, November 5th, 2019, merge conflict handling and server additions
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
function readFileSendReqAndWriteResponse(filePath: string, channel: vscode.OutputChannel) {
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
        // console.log('IN SET TIMEOUT');

        // parse off the extra quotes
        const queryMinusQuotes: string = typeof result[1] === 'string'
          ? result[1].slice(1, result[1].length - 1)
          : 'error';

        // console.log('query w/o quotes is', queryMinusQuotes);

        // send the fetch to the correct port
        // TODO Ed is working on passing a parsed port number into here?
        fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: queryMinusQuotes }),
        })
          .then((response: Response) => response.json())
          .then((thing: Object) => {
            console.log('printed: ', thing);
            channel.append(`Responses are:\n${JSON.stringify(thing, null, 2)}`); // may need to stringify to send
            channel.show(true);
          })
          .catch((error: Error) => {
            console.log('fetch catch error: ', error, typeof error, error.constructor.name);
            channel.append(`ERROR!!!\n${JSON.stringify(error, null, 2)}`);
          });
      }, 5000); // TODO BIG UX FIX NEEDED HERE

      // then send response back to vscode output channel
      // console.log('parsed queries are', result);
      // TODO match these up with the correct queries when there are multiple within a single file
      channel.append(`GraphQuill Queries are:\n${result.filter((e : string|Error) => (typeof e === 'string' ? e.length : 0))}\n`);
      channel.show(true);
    }
  });
}

// console.log(readFileSendReqAndWriteResponse(`${__dirname}/parseMe.js`))


// console.log(findGQ(longTest));

module.exports = readFileSendReqAndWriteResponse;
