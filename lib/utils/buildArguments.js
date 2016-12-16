'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildArguments;

var _handleCommand = require('./handleCommand');

var _handleCommand2 = _interopRequireDefault(_handleCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildArguments(commandObject, fromEnv, toEnv) {
  return function (yargs) {
    commandObject.cmds.forEach(function (cmd) {
      yargs = yargs.command(cmd, '', {}, (0, _handleCommand2.default)(commandObject, fromEnv, toEnv, cmd));
    });
    return yargs;
  };
}