const { PROJECT_TYPE, PROJECT_NAME } = require('./.project.config')

module.exports = config => {
  config.testMatch = [`<rootDir>/src/${PROJECT_TYPE}/${PROJECT_NAME}/**/{spec,test}.{js,jsx,ts,tsx}`]
  config.preset = 'jest-puppeteer'
  config.setupFiles = ['<rootDir>/bin/jest.init.js']

  return config
}
