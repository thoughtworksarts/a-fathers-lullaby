// const path = require('path')
const alias = require('./config/aliases')
const jestConfig = require('./config/jestConfig')

module.exports = {
  webpack: {
    alias
  },
  jest: jestConfig
}
