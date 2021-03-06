var assert = require('assert');
var babel = require('babel-core');

describe('Transform', function() {
  it('should wrap body in commonJS wrapper', function() {
    const es6ModuleCode = 'export var foo = 1;';
    const expected =`define(function (require, exports, module) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var foo = exports.foo = 1;
});`;

    var actual = babel.transform(es6ModuleCode, {
      plugins: ['./lib/index.js']
    }).code;

    assert.equal(actual, expected);
  });
});
