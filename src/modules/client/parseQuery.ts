
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

module.exports = parseQuery;
