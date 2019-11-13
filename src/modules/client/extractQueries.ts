/* eslint-disable import/no-unresolved */
// import { builtinModules } from 'module';

const parseQuery = require('./parseQuery.js');

const useCheckQueryBrackets = require('./checkQueryBrackets.js');

// given file path, read file at path and parse for instances of 'graphQuill'
function extractQueries(string: string) {
  // console.log(string);
  // define text to search for in file
  const gq: string = 'graphQuill';
  const queriesArr: string[] = [];
  // iterate over string
  for (let i: number = 0; i < string.length; i += 1) {
    // if current slice of string is 'graphQuill'
    // then push evaluated result of parseQueries passing in
    // string sliced from current char to end into queriesArr
    if (string.slice(i, i + gq.length) === gq) {
      queriesArr.push(parseQuery(string.slice(i + gq.length)));
    }
  }

  // after finding all instances of 'graphQuill' and parsing out query strings,
  // map queries to new array full of either valid queries of errors
  const validatedQueriesArr: (string | Error)[] = queriesArr.map((queryString) => (
    useCheckQueryBrackets(queryString)));
  // console.log('queriesArr: ', queriesArr);
  // console.log('validatedQueriesArr: ', validatedQueriesArr);
  return validatedQueriesArr;
}// given file path, read file at path and parse for instances of 'graphQuill'

module.exports = extractQueries;
