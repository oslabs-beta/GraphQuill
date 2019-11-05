// ! ALL CODE IS COPIED FROM PARSER.TEST.JS, NEEDS TO BE UPDATED TO TEST ANY SERVER STUFF
// ! Also might need super test...

// ! I need to look into how to even test a server/terminal/child process...

// * THIS LINE SETS THE ENVIRONMENT TO MOCHA, so describe, it etc. are not undefined
/* eslint-env mocha */

// * this rule is disable for testing files because mocha uses the this keyword (I think)
// * under the hood, and arrow functions point to the window object
/* eslint-disable prefer-arrow-callback */

// some extra chai options that we may wnat to use...
// const { assert, expect, should } = require('chai');
import { expect } from 'chai';
import 'mocha';

import testServerOn from '../../modules/server/serverOn';

// I believe mocha uses the "this" keyboard a lot, so that's why these should NOT be arrow functions
describe('Testing serverOn function', function () {
  it('should return a promise', function () {
    expect(typeof testServerOn()).to.equal('Promise');
  });

  // this test is kind of confusing... ed please fix it
  // it('should return \'unbalanced parens\' if the query has unbalanced parens', function () {
  //   const result = testParseQuery('(unbalanced()) parens)');
  //   expect(result).to.equal('unbalanced parens');
  // });
});
