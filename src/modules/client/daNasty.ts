/* eslint-disable no-unused-vars */
/**
 * @module: parser.ts
 * @author: Austin Ruby
 * @function: parse string for instances of 'graphQuill' and extract content
 * within parens immediately following each instance
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fetch = require('node-fetch');
const fs = require('fs');

// check if parens are balanced for parsed query strings
// if they're balanced, return original query string
// if they're not, return error message with imbalanced bracket/s
function checkQueryBrackets(queryString: string) {
  // mapping opening brackets to corresponding closing brackets
  enum BracketTokens {
    '(' = ')',
    '{' = '}',
    '[' = ']'
  }
  // defining closing brackets
  enum closeBrackets {
    ')',
    '}',
    ']'
  }

  // validate that a string character is a possible lookup value in the BracketTokens enum
  function validateBracketToken(char: string): char is keyof typeof BracketTokens {
    return char in BracketTokens;
  }

  // initialize stack to push open brackets onto
  const stack: string[] = [];
  // iterate over query string looking for open and close brackets
  // as defined by the BracketTokens and closeBrackets enums
  for (let i: number = 0; i < queryString.length; i++) {
    // push current char onto stack if current char is open bracket
    if (queryString[i] in BracketTokens) stack.push(queryString[i]);
    // if current char is close bracket
    else if (queryString[i] in closeBrackets) {
      // pop last element off of stack as 'popped'
      const popped: string | undefined = stack.pop();
      // initialize validatedPopped as a string to hold popped chars that are not undefined
      let definedPopped: string;
      // double check that popped is defined before doing anything with
      // it that could throw and error if it's undefined
      if (popped !== undefined) {
        // assign definedPopped to popped value now that it's definitely not undefined
        definedPopped = popped;
        // check if definedPopped exists as index in BracketTokens
        if (validateBracketToken(definedPopped)) {
          // if the closing bracket associated with the popped opening bracket doesn't match
          // the closing bracket that is the current char, return an error
          if (BracketTokens[definedPopped] !== queryString[i]) return new Error(`succcccccccc ${stack}`);
        }
      }
    }
  }
  // if the loop gets through the entire string without throwing an error,
  // if nothing is left in the stack, then the query is balanced and it is returned
  // otherwise throw an error
  return stack.length === 0
    ? queryString.slice(1, queryString.length - 1)
    : new Error(`succcccccccc ${stack}`);
}

// add characters to string while within parentheses
function parseQuery(input: string) {
  // initialize queryString to return once stack is empty
  let queryString: string = '';
  // initialize open and close parens
  const openParen: string = '(';
  const closeParen: string = ')';
  // initialize stack to push/pop open parens to/from
  const stack: string[] = [];
  // initialize index to point to current char in string
  let index: number = 0;
  // iterate over input string at least once, while there are parens in the stack
  // and index hasn't reached the end of the input string
  do {
    const currentChar: string = input[index];
    // if current char is open paren, push to stack
    // if current char is close paren, pop off of stack
    if (currentChar === openParen) {
      stack.push(currentChar);
    } else if (currentChar === closeParen) {
      if (!stack.length) return 'unbalanced parens';
      stack.pop();
    }
    // add current char to queryString and increment index before next iteration of loop
    queryString += currentChar;
    index += 1;
  } while (stack.length && index < input.length);
  return queryString;
}


// given file path, read file at path and parse for instances of 'graphQuill'
function extractQueries(string: string) {
  // console.log(string);
  // define text to search for in file
  const gq: string = 'graphQuill';
  const queriesArr: string[] = [];
  // iterate over string
  for (let i: number = 0; i < string.length; i += 1) {
    // if current slice of string is 'graphQuill'
    // push evaluated result of parseQueries passing in
    // string sliced from current char to end
    // into queriesArr
    if (string.slice(i, i + gq.length) === gq) {
      queriesArr.push(parseQuery(string.slice(i + gq.length)));
    }
  }
  // after finding all instances of 'graphQuill' and parsing out query strings,
  // map queries to new array full of either valid queries of errors
  const validatedQueriesArr: (string | Error)[] = queriesArr.map((queryString) => (
    checkQueryBrackets(queryString)));
  // console.log('queriesArr: ', queriesArr);
  // console.log('validatedQueriesArr: ', validatedQueriesArr);
  return validatedQueriesArr;
}

// parent function to read file,
// call helper functions to parse out query string,
// send request to GraphQL API,
// and return response to output channel
function readFileSendReqAndWriteResponse(filePath: string,
  channel: vscode.OutputChannel, callback: any) {
  // read user's file
  fs.readFile(filePath, (err: Error, data: Buffer) => {
    if (err) {
      console.log(err);
    } else {
      // if no error, convert data to string and pass into gQParser to pull out query/ies
      const result: (string | Error)[] = extractQueries(data.toString());
      // send post request to API/graphql
      setTimeout(() => {
        fetch('http://localhost:3000/')
          .then((response: any) => response.text())
          .then((thing: any) => {
            console.log('printed: ', thing);
            channel.append(`look at this shit: ${thing}`);
            channel.show(true);
            callback();
          })
          .catch((error: Error) => {
            callback();
            console.log(error);
          });
      }, 1000);
      // then send response back to vscode output channel
      // console.log(result);
      // channel.append(`result: ${result}`);
      // channel.show(true);
    }
  });
}

// console.log(readFileSendReqAndWriteResponse(`${__dirname}/parseMe.js`))


// console.log(findGQ(longTest));

module.exports = readFileSendReqAndWriteResponse;
