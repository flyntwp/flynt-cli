'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;
exports.handler = handler;
var command = exports.command = 'foo';
var desc = exports.desc = 'foo bar';
function builder(yargs) {
  console.log('build foo');
  return yargs;
}
function handler(argv) {
  console.log('handle foo', argv);
  return {};
}