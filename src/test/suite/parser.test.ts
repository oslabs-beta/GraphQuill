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
const extractQueries = require('../../modules/client/extractQueries');

// const findRootDirectory = require('../../modules/client/findRootDirectory');
// const parseConfigFile = require('../../modules/client/parseConfigFile');

// readFileSRWR tests on hold because vs code extension testing suite is weird

// I believe mocha uses the "this" keyboard a lot, so that's why these should NOT be arrow functions
describe('Testing all parsing functions', function () {
  describe('Testing parseQuery', function () {
    it('should be a function', function () {
      expect(typeof parseQuery).to.equal('function');
    });

    it('should handle one open parens correctly', function () {
      const result = parseQuery('(');
      expect(result).to.equal('unbalanced parens');
    });

    it('should handle one closed parens correctly', function () {
      const result = parseQuery(')');
      expect(result).to.equal('unbalanced parens by closed');
    });

    it('should handle one parens pair correctly', function () {
      const result = parseQuery('()');
      expect(result).to.equal('()');
    });

    it('should return the input query if it has balanced parens', function () {
      const result = parseQuery('(this has balanced parens())');
      expect(result).to.equal('(this has balanced parens())');
    });

    it('should return \'unbalanced parens\' if the query has more complex unbalanced parens', function () {
      const result = parseQuery('(unbalanced()) parens)');
      expect(result).to.equal('unbalanced parens by closed');
    });
  });

  describe('Testing checkQueryBrackets', function () {
    it('should be a function', function () {
      expect(typeof checkQueryBrackets).to.equal('function');
    });

    it('should fail on uneven number of brackets', function () {
      const result = checkQueryBrackets('{');
      expect(result.toString()).to.equal('Error: The following character makes the query unbalanced: {\nThe portion of the query that ran before the unbalance was detected was:\n{\n\n');
    });

    it('should fail on wrong brackets', function () {
      const result = checkQueryBrackets('{)})');
      expect(result.toString()).to.equal('Error: The following character makes the query unbalanced: {\nThe portion of the query that ran before the unbalance was detected was:\n{\n\n');
    });

    it('should cut first and last elements of string without failing brackets', function () {
      const result = checkQueryBrackets('wow');
      expect(result).to.equal('o');
    });

    it('should return body with valid brackets', function () {
      const result = checkQueryBrackets('{mmmm}');
      expect(result).to.equal('mmmm');
    });
  });

  describe('Testing extractQueries', function () {
    it('should be a function', function () {
      expect(typeof extractQueries).to.equal('function');
    });

    it('should extract a query', function () {
      const result = extractQueries('graphQuill(`\n{customer(id: 1) { lastName }\n}\n`);');
      expect(result[0]).to.equal('`\n{customer(id: 1) { lastName }\n}\n`');
    });

    it('should extract first of two queries', function () {
      const result = extractQueries('graphQuill(`\n{customer(id: 1) { lastName }\n}\n`);\ngraphQuill(`\n{customer(id: 2) { lastName }\n}\n`);');
      expect(result[0]).to.equal('`\n{customer(id: 1) { lastName }\n}\n`');
    });

    it('should extract second of two queries', function () {
      const result = extractQueries('graphQuill(`\n{customer(id: 1) { lastName }\n}\n`);\ngraphQuill(`\n{customer(id: 2) { lastName }\n}\n`);');
      expect(result[1]).to.equal('`\n{customer(id: 2) { lastName }\n}\n`');
    });

    it('no queries should return empty array', function () {
      const result = extractQueries('grap`);');
      expect(result).to.deep.equal([]);
    });

  });

});
