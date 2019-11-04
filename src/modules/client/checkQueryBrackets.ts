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
          if (BracketTokens[definedPopped] !== queryString[i]) return new Error(`succcccccccc it ${stack}`);
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

module.exports = checkQueryBrackets;
