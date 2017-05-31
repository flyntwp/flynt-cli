'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addLinesToFiles;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const readFile = _bluebird2.default.promisify(_fs2.default.readFile);
const writeFile = _bluebird2.default.promisify(_fs2.default.writeFile);

// the argument linesToAdd has to be of the form:
// {
//   filePath1: 'lineToAdd1'
//   filePath2: ['lineToAdd21', 'lineToAdd22']
//   filePath3: {
//     lines: ['lineToAdd31', 'lineToAdd32'],
//     prepend: true
//     ...
//   }, ...
// }
function addLinesToFiles(linesToAdd) {
  return _bluebird2.default.all(Object.keys(linesToAdd).map(function (file) {
    const value = linesToAdd[file];
    let lines, options;
    if ((0, _isPlainObject2.default)(value)) {
      var _value = value;
      lines = _value.lines;
      options = _objectWithoutProperties(_value, ['lines']);
    } else {
      lines = value;
    }
    return addLinesToFile(file, lines, options);
  }));
}

function addLinesToFile(filePath, lines, options = {}) {
  lines = [].concat(lines);
  return getContent(filePath).then(function (fileContent) {
    lines.forEach(function (line) {
      fileContent = addLineToContent(fileContent, line, options);
    });
    return fileContent;
  }).then(function (newContent) {
    return writeFile(filePath, newContent, 'utf-8');
  });
}

function getContent(filePath) {
  if (_fs2.default.existsSync(filePath)) {
    return readFile(filePath, 'utf-8');
  } else {
    return _bluebird2.default.reject(new Error(`File ${ filePath } does not exist`));
  }
}

function addLineToContent(content, line, options) {
  let newContent = content;
  line = `${ line }\n`;
  if (content.indexOf(line) === -1) {
    newContent = options.prepend ? line + content : content + line;
  }
  return newContent;
}