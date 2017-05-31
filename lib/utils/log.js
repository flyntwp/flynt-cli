'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = undefined;
exports.default = log;
exports.setLevel = setLevel;
exports.getLevel = getLevel;
exports.is = is;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let currentLevel = 0;

const levels = exports.levels = {
  LOG: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

function log(message, level = 0) {
  level = convertLevel(level);
  const logMethods = ['log', 'warn', 'info', 'log'];
  if (level <= currentLevel) {
    console[logMethods[level]](message);
  }
}

function setLevel(level) {
  currentLevel = convertLevel(level);
  return getLevel;
}

function getLevel() {
  return currentLevel;
}

function is(level) {
  level = convertLevel(level);
  if (level <= currentLevel) {
    return true;
  }
  return false;
}

function convertLevel(level) {
  if ((0, _isString2.default)(level)) {
    return levels[level];
  }
  return level;
}