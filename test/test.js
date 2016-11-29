var assert = require('assert');
var babel = require('babel-core');

describe('Transform', function() {
  it('should wrap body in commonJS wrapper', function() {
    var actual = babel.transform('code();', {
      plugins: ['./lib/index.js']
    }).code;
    assert.equal(actual, 'define(function(require, exports, module) { code(); });');
  });
});
