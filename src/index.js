import template from "babel-template";

let templ = template('define(function(require, exports, module) { BODY; });');

export default function ({ Plugin, types: t }) {
  return {
    inherits: require("babel-plugin-transform-es2015-modules-commonjs"),
    visitor: {
      Program: {
        exit(path) {
          path.node.body = templ({
            BODY: path.node.body
          });
        }
     }
    }
  }
}
