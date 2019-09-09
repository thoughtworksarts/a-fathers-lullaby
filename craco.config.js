// const path = require('path')
const jestConfig = require('./config/jestConfig')
const webpackConfig = require('./config/webpackConfig')

module.exports = {
  webpack: webpackConfig,
  jest: jestConfig
}
