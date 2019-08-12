const projectConfig = require('./public/project-config')

module.exports = config => {
  config.testMatch = [`<rootDir>/src/${projectConfig.PROJECT_TYPE}/${projectConfig.PROJECT_NAME}/**/{spec,test}.{js,jsx,ts,tsx}`]
  config.preset = 'jest-puppeteer'
  config.setupFiles = ['<rootDir>/bin/jest.init.js']

  return config
}
