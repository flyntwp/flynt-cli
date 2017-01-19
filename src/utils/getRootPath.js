import path from 'path'
import fs from 'fs'

function isFileInPath (file, dir) {
  try {
    fs.statSync(path.join(dir, file))
    return true
  } catch (e) {
    return false
  }
}

export default function getRootPath (start = process.cwd()) {
  if (typeof start === 'string') {
    if (start[start.length - 1] !== path.sep) {
      start += path.sep
    }
    start = start.split(path.sep)
  }
  if (!start.length) return false
  start.pop()
  const dir = start.join(path.sep)
  if (isFileInPath('.flynt.json', dir)) return dir
  if (isFileInPath('composer.json', dir)) return dir
  if (isFileInPath('.git', dir)) return dir
  return getRootPath(start)
}
