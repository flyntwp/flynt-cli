import fs from 'fs'
import Promise from 'bluebird'
import isPlainObject from 'lodash/isPlainObject'

const readFile = Promise.promisify(fs.readFile)
const writeFile = Promise.promisify(fs.writeFile)

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
export default function addLinesToFiles (linesToAdd) {
  return Promise.all(Object.keys(linesToAdd).map(function (file) {
    const value = linesToAdd[file]
    let lines, options
    if (isPlainObject(value)) {
      ({lines, ...options} = value)
    } else {
      lines = value
    }
    return addLinesToFile(file, lines, options)
  }))
}

function addLinesToFile (filePath, lines, options = {}) {
  lines = [].concat(lines)
  return getContent(filePath)
  .then(function (fileContent) {
    lines.forEach(function (line) {
      fileContent = addLineToContent(fileContent, line, options)
    })
    return fileContent
  }).then(function (newContent) {
    return writeFile(filePath, newContent, 'utf-8')
  })
}

function getContent (filePath) {
  if (fs.existsSync(filePath)) {
    return readFile(filePath, 'utf-8')
  } else {
    return Promise.reject(new Error(`File ${filePath} does not exist`))
  }
}

function addLineToContent (content, line, options) {
  let newContent = content
  line = `${line}\n`
  if (content.indexOf(line) === -1) {
    newContent = options.prepend ? line + content : content + line
  }
  return newContent
}
