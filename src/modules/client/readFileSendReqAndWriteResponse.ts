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
 * @changelog : Alex Chao, November 6th, 2019, dynamic port number for fetching, coming from
 * the extension.ts file
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fetch = require('node-fetch');
const fs = require('fs');

const extractQueries = require('./extractQueries.js');

// checkQueryBrackets used to be here
// parseQuery used to be here
// extractQueries was here

// parent function to read file,
// call helper functions to parse out query string,
// send request to GraphQL API,
// and return response to output channel
function readFileSendReqAndWriteResponse(
  filePath: string,
  channel: vscode.OutputChannel,
  portNumber: number,
  rootPath: string, // passing the root path in to control the function def. injection
) {
  // console.log('inreadFile: ', filePath);

  // parse the contents of the entire filePath file to a string
  const copy = fs.readFileSync(filePath).toString();
  // check if the file is within the root directory, otherwise we don't want to inject the
  // function defintion
  if (filePath.includes(rootPath) && !copy.includes('function graphQuill')) {
    const newFile = `function graphQuill() {}\n\n${copy}`;
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

        // handle multiple queries in file...
        // the additional quotes need to be parsed off
        const queriesWithoutQuotes: (string|false)[] = result.filter(
          // callback to remove empty string queries (i.e. the function def of graphQuill)
          (e: string|Error) => (typeof e === 'string' && e.length),
        ).map(
          (query: string|Error) => (
            // should all be strings...
            // remove extra quotes
            typeof query === 'string' && query.slice(1, query.length - 1)
          ),
        );

        console.log('--JUST THE QUERIES', queriesWithoutQuotes);


        // TODO pair up the requests and responses. Right now the responses are coming in a random
        // TODO order because of async fetches

        // TODO MAKE THIS A PROMISE ALL? or does it not matter because the for loop will send off
        // TODO all of the fetches simultaneously and just append responses on as they come in...
        // console.log('query w/o quotes is', queryMinusQuotes);
        queriesWithoutQuotes.forEach((query) => {
          // send the fetch to the correct port (passed in as a variable)
          fetch(`http://localhost:${portNumber}/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          })
            .then((response: Response) => response.json())
            .then((thing: Object) => {
              console.log('printed: ', thing);
              // append any graphql response to the output channel
              channel.append(`\n${JSON.stringify(thing, null, 2)}`); // may need to stringify to send
              channel.show(true);
            })
            .catch((error: Error) => {
              console.log('fetch catch error: ', error, typeof error, error.constructor.name);

              // print any errors to the output channel
              channel.append(`ERROR!!!\n${JSON.stringify(error, null, 2)}`);
            });
        });

        // only append this string to the output channel once
        channel.append('Responses are:');
      }, 1);

      // then send response back to vscode output channel
      // console.log('parsed queries are', result);
      // TODO match these up with the correct queries when there are multiple within a single file
      // TODO still the promise all thing
      channel.append(`GraphQuill Queries are:\n${result.filter((e : string|Error) => (typeof e === 'string' ? e.length : false))}\n`);
      channel.show(true);
    }
  });
}

module.exports = readFileSendReqAndWriteResponse;
