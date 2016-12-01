# babel-plugin-transform-es2015-modules-requirejs

A [Babel](https://github.com/babel/babel) plugin to transform ES2015 modules to AMD using [RequireJS's common JS wrapper](http://requirejs.org/docs/commonjs.html#manualconversion).

```
export var foo = 1;
```

is transformed to:

```
define(function (require, exports, module) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var foo = exports.foo = 1;
});
```
