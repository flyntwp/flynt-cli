'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildArguments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _handleCommand = require('./handleCommand');

var _handleCommand2 = _interopRequireDefault(_handleCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildArguments(commandObject, fromEnv, toEnv) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return function (yargs) {
    Object.keys(options).forEach(function (optionKey) {
      options[optionKey].group = 'Command Specific Option:';
    });
    commandObject.cmds.forEach(function (cmd) {
      var cmdObject = commandObject.commands[cmd];
      yargs = yargs.command(cmd, cmdObject.description, options, (0, _handleCommand2.default)(commandObject, fromEnv, toEnv, cmd));
    });
    _lodash2.default.forIn(options, function (value, key) {
      yargs.option(key, value);
    });
    return yargs;
  };
}