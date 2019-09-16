const path = require('path')

const fs = require('fs')
const dotenv = require('dotenv')

process.traceDeprecation = true

process.env.APP_ENV = process.env.APP_ENV || 'development'

const envFiles = [
  `.env.${process.env.APP_ENV}`,
  `.env.${process.env.APP_ENV}.local`
]

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const envConfig = dotenv.parse(fs.readFileSync(file))

    Object.keys(envConfig).forEach(envKey => {
      process.env[envKey] = envConfig[envKey]
    })
  }
})


const jestConfig = require('./jestConfig')
const webpackConfig = require('./webpackConfig')

module.exports = {
  webpack: webpackConfig,
  jest: jestConfig
}
