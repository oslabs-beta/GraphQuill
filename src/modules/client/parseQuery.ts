/**
 * @author : Austin Ruby
 * @function : parse and validate query
 * @changelog : Ed Greenberg, November 5th, 2019, created ability to return unbalanced parens
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// add characters to string while within parentheses
module.exports = function parseQuery(input: string) {
  // string to be checked for balanced parens
  let queryString: string = '';

  // final answer string
  let passedQueryString: string = '';

  // helper variables
  let closer: boolean = false;
  let openParensCount: number = 0;
  let closeParensCount: number = 0;
  let index: number = 0;
  const stack: string[] = [];

  // loop over the input
  while (index < input.length) {
    // check for open parens
    if (input[index] === '(') {
      // increment the open parens counter
      openParensCount += 1;
      // add to stack
      stack.push(input[index]);
    } else if (input[index] === ')') {
      // check closed parens
      if (stack.length === 0) {
        // if stack is empty and we have a closed, we have a problem
        return 'unbalanced parens by closed';
      }
      // otherwise increment the close parens counter and pop off the stack
      closeParensCount += 1;
      stack.pop();
    }

    // feed current character in loop to preliminary result string
    queryString += input[index];

    // first run through loop we hit empty stack...
    if (stack.length === 0 && closer === false) {
      // create result stack;
      passedQueryString = queryString;
      closer = true;
    }
    index += 1;
  }

  return openParensCount === closeParensCount ? passedQueryString : 'unbalanced parens';
};
