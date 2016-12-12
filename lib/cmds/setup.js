'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.builder = builder;
exports.handler = handler;
var command = exports.command = 'setup [<command>]';
var desc = exports.desc = 'Manage set of tracked repos';
function builder(yargs) {
  console.log('build setup');
  return yargs.commandDir('setup').option('c', {
    alias: 'config',
    default: '.flyntrc',
    describe: 'path of the config file',
    type: 'string',
    normalize: true
  });
}
function handler(argv) {
  console.log('handler setup', argv, argv.config);
  return {};
}