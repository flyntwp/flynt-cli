import path from 'path'
import fs from 'fs'

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
  if (fs.existsSync(path.join(dir, '.flynt.json'))) return dir
  if (fs.existsSync(path.join(dir, 'composer.json'))) return dir
  if (fs.existsSync(path.join(dir, '.git'))) return dir
  return getRootPath(start)
}
