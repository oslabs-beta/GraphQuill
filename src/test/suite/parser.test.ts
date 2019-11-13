// * THIS LINE SETS THE ENVIRONMENT TO MOCHA, so describe, it etc. are not undefined
/* eslint-env mocha */

// * this rule is disable for testing files because mocha uses the this keyword (I think)
// * under the hood, and arrow functions point to the window object
/* eslint-disable prefer-arrow-callback */

// some extra chai options that we may wnat to use...
// const { assert, expect, should } = require('chai');
import { expect } from 'chai';
import 'mocha';

const parseQuery = require('../../modules/client/parseQuery');
const checkQueryBrackets = require('../../modules/client/checkQueryBrackets');
// const findRootDirectory = require('../../modules/client/findRootDirectory');
// const parseConfigFile = require('../../modules/client/parseConfigFile');

// readFileSRWR tests on hold because vs code extension testing suite is weird

// I believe mocha uses the "this" keyboard a lot, so that's why these should NOT be arrow functions
describe('Testing all parsing functions', function () {
  describe('Testing parseQuery', function () {
    it('should return the inputted query if it has balanced parens', function () {
      const result = parseQuery('(this has balanced parens())');
      expect(result).to.equal('(this has balanced parens())');
    });

    // this test is kind of confusing... ed please fix it
    it('should return \'unbalanced parens\' if the query has unbalanced parens', function () {
      const result = parseQuery('(unbalanced()) parens)');
      expect(result).to.equal('unbalanced parens');
    });
  });

  // testing the checkQueryBrackets function...
  describe('Testing checkQueryBrackets', function () {
    it('should be a function', function () {
      expect(typeof checkQueryBrackets).to.equal('function');
    });
  });
});
