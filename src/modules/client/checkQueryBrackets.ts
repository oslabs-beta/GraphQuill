/**
 * @module : parser.ts
 * @author : Austin Ruby
 * @function : parse string for instances of 'graphQuill' and extract content
 * within parens immediately following each instance
 * @changelog : Ed Greenberg, November 4th, 2019, rewrote to remove enum bug
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// check if parens are balanced for parsed query strings
// if they're balanced, return original query string
// if they're not, return error message with imbalanced bracket/s
function checkQueryBrackets(queryString: string) {
  const stack: string[] = []; // the core of the function...
  // ...where detected opening brackets will be pushed in and pop off when the parser finds a mate
  const validatedSoFar: string[] = []; // a running copy of the query
  const openings: string = '{[('; // list of opening brackets
  const closings: string = '}])'; // list of closing brackets


  // eslint-disable-next-line no-restricted-syntax
  for (const el of queryString) { // loop the query
    if (openings.includes(el)) stack.push(el); // if query el is opening bracket, add el to stack
    if (closings.includes(el)) {
      // if top of stack mates a new closing bracket, we are good, can reduce stack and keep going
      if (stack[stack.length - 1] === openings[closings.indexOf(el)]) stack.pop();
      // if the top of stack does not mate closing bracket, we stop loop and skip to declaring error
      else break;
    }
    validatedSoFar.push(el); // helping keep running copy of query
  }


  return stack.length === 0 // this will be zero if all query brackets have matches
    ? queryString.slice(1, queryString.length - 1) // this substring is sent ahead if validated
    : new Error(`${`The following character makes the query unbalanced: ${stack[stack.length - 1]}\n`
      + 'The portion of the query that ran before the unbalance was detected was:\n'}${
      validatedSoFar.join('')}\n\n`); // ...otherwise, we report an error
}

module.exports = checkQueryBrackets;
