/**
 * @author : Austin Ruby
 * @function : parse and validate query
 * @changelog : Ed Greenberg, November 5th, 2019, created ability to return unbalanced parens
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// add characters to string while within parentheses
export default function parseQuery(input: string) {
  let queryString: string = ''; // string to be checked for balanced parens
  let passedQueryString: string = ''; // string to be passed along
  let closer: boolean = false; // trip to prevent passed along string from overwriting
  let openParensCount: number = 0; // balanced parens validation tool
  let closeParensCount: number = 0; // balanced parens valaidation tool
  let index: number = 0; // helps loop through input
  const stack: string[] = []; // helps determine when query should be passed along
  while (index < input.length) { // loop input
    if (input[index] === '(') { // check open parens
      openParensCount += 1; // increment relevant counter
      stack.push(input[index]); // add to stack
    } else if (input[index] === ')') { // check closed parens
      if (stack.length === 0) { // if stack is empty and we have a closed, we have a problem
        return 'unbalanced parens';
      }
      closeParensCount += 1; // increment relevant counter
      stack.pop(); // closed parens eliminates open parens on stack
    }
    queryString += input[index]; // feed current character in loop to preliminary result string
    if (stack.length === 0 && closer === false) { // first time we hit empty stack...
      passedQueryString = queryString; // create result stack;
      closer = true;
    }
    index += 1;
  }
  return openParensCount === closeParensCount ? passedQueryString : 'unbalanced parens';
}
