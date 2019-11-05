// * THIS LINE SETS THE ENVIRONMENT TO MOCHA, so describe, it etc. are not undefined
/* eslint-env mocha */

// * this rule is disable for testing files because mocha uses the this keyword (I think)
// * under the hood, and arrow functions point to the window object
/* eslint-disable prefer-arrow-callback */

// some extra chai options that we may wnat to use...
// const { assert, expect, should } = require('chai');
import { expect } from 'chai';
import 'mocha';

import testParseQuery from '../../modules/client/parseQuery';

// I believe mocha uses the "this" keyboard a lot, so that's why these should NOT be arrow functions
describe('Testing parseQuery function', function () {
  it('should return the inputted query if it has balanced parens', function () {
    const result = testParseQuery('(this has balanced parens())');
    expect(result).to.equal('(this has balanced parens())');
  });

  // this test is kind of confusing... ed please fix it
  it('should return \'unbalanced parens\' if the query has unbalanced parens', function () {
    const result = testParseQuery('(unbalanced()) parens)');
    expect(result).to.equal('unbalanced parens');
  });
});
