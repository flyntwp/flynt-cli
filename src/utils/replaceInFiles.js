import replace from 'replace-in-file'
import Promise from 'bluebird'

// the argument replacements has to be of the form:
// {
//   filePath1: {
//     search1: 'replace1',
//     search2: 'replace2',
//     ...
//   }, ...
// }
export default function replaceInFiles (replacements) {
  return Promise.all(Object.keys(replacements).map(function (file) {
    const searchFor = Object.keys(replacements[file])
    const replaceWith = searchFor.map((sf) => replacements[file][sf])
    return replace({
      files: file,
      from: searchFor,
      to: replaceWith
    })
  }))
}
