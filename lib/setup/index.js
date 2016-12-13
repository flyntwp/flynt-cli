'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = undefined;
exports.run = run;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _installBedrock = require('./installBedrock');

var installBedrock = _interopRequireWildcard(_installBedrock);

var _requireComposerPackages = require('./requireComposerPackages');

var requireComposerPackages = _interopRequireWildcard(_requireComposerPackages);

var _setupTheme = require('./setupTheme');

var setupTheme = _interopRequireWildcard(_setupTheme);

var _initGitRepo = require('./initGitRepo');

var initGitRepo = _interopRequireWildcard(_initGitRepo);

var _createDb = require('./createDb');

var createDb = _interopRequireWildcard(_createDb);

var _setupWordpress = require('./setupWordpress');

var setupWordpress = _interopRequireWildcard(_setupWordpress);

var _activateWordpress = require('./activateWordpress');

var activateWordpress = _interopRequireWildcard(_activateWordpress);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cmdsObject = {
  installBedrock: installBedrock,
  requireComposerPackages: requireComposerPackages,
  setupTheme: setupTheme,
  initGitRepo: initGitRepo,
  createDb: createDb,
  setupWordpress: setupWordpress,
  activateWordpress: activateWordpress
};

var cmds = exports.cmds = Object.keys(cmdsObject);

function run(step) {
  var steps = !step ? cmds : [].concat(step);
  steps = steps.filter(function (step) {
    return !!cmdsObject[step];
  });
  var requirements = steps.map(function (step) {
    return cmdsObject[step].requirements;
  });
  var prompts = steps.map(function (step) {
    return cmdsObject[step].prompts;
  });
  var runs = steps.map(function (step) {
    return cmdsObject[step].run;
  });

  return _bluebird2.default.all(_lodash2.default.union.apply(_lodash2.default, _toConsumableArray(requirements)).map(function (fn) {
    return fn();
  })).then(function () {
    _inquirer2.default.prompt(_lodash2.default.union.apply(_lodash2.default, _toConsumableArray(prompts))).then(function (answers) {
      var allRuns = _bluebird2.default.resolve();
      runs.forEach(function (fn) {
        return allRuns = allRuns.then(function () {
          return fn(answers);
        });
      });
      return allRuns;
    });
  }, function (err) {
    console.log(err);
  });
}