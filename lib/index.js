#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _installBedrock = require('./setup/installBedrock');

var installBedrock = _interopRequireWildcard(_installBedrock);

var _setupWordpress = require('./setup/setupWordpress');

var setupWordpress = _interopRequireWildcard(_setupWordpress);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import {builder} from './cmds/setup'

// yargs
// .commandDir('cmds')
// // .demand(1)
// .help()
// .argv

var requirements = [installBedrock, setupWordpress].map(function (task) {
  return task.requirements;
});

var prompts = [installBedrock, setupWordpress].map(function (task) {
  return task.prompts;
});

var runs = [installBedrock, setupWordpress].map(function (task) {
  return task.run;
});

_bluebird2.default.all(_lodash2.default.union.apply(_lodash2.default, _toConsumableArray(requirements)).map(function (fn) {
  return fn();
})).then(function () {
  _inquirer2.default.prompt(_lodash2.default.union.apply(_lodash2.default, _toConsumableArray(prompts))).then(function (answers) {
    console.log(answers);
    console.log(runs);
    var allRuns = _bluebird2.default.resolve();
    runs.forEach(function (fn) {
      return allRuns = allRuns.then(function () {
        return fn(answers);
      });
    });
    // Promise.all(runs.map(fn => fn(answers)))
  });
}, function (err) {
  console.log(err);
});