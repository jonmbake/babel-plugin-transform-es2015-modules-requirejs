import template from "babel-template";

let templ = template(`define(function(require, exports, module) {
  BODY;
});`);

export default function ({ Plugin, types: t }) {
  return {
    inherits: require("babel-plugin-transform-es2015-modules-commonjs"),
    visitor: {
      Program: {
        exit(path) {

          let isAmdModule = false;

          path.traverse({
              CallExpression({ node }) {
                  if (node.callee && node.callee.name === 'define') {
                    isAmdModule = true;
                  }
              }
          });

          // no point in wrapping something that's already AMD
          if (isAmdModule) {
            return;
          }

          let body = templ({
            BODY: path.node.body
          });
          //move "use strict" declaration inside wrapper if exists
          let i = path.node.directives.findIndex(d => d.value && d.value.value === 'use strict');
          if (i >= 0) {
            body.expression.arguments[0].body.directives.unshift(path.node.directives.splice(i, 1)[0]);
          }
          path.node.body = [body];
        }
     }
    }
  }
}
