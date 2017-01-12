import childProcess from 'child_process'

export default function getRootPath () {
  const rootPath = childProcess.execSync('git rev-parse --show-toplevel').toString()
  return rootPath.substr(0, rootPath.length - 1)
}
