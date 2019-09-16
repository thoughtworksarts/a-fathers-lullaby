const path = require('path')
const aliases = require('./aliases')
const basePath = path.join(__dirname, '..', 'src')

const mapAliasNamesJest = (aliases) => {
  const nameMap = {}

  Object.keys(aliases).forEach(alias => {
    const aliasPath = aliases[alias]

    const mappedPath = aliasPath.replace(basePath, '<rootDir>/src')

    nameMap[`^${alias}[/]?(.*)`] = mappedPath + '/$1'
  })

  return nameMap
}

module.exports = {
  configure: {
    moduleNameMapper: mapAliasNamesJest(aliases),
    setupFiles: [
      path.join(__dirname, '..', 'config/setupTests.js')
    ]
  }
}
