import path from 'path'

const packageJsonPath = path.join(__dirname, '..', '..', 'package.json')
const packageJson = require(packageJsonPath)

const phpDependencies = packageJson.phpDependencies

export default phpDependencies
