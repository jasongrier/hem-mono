const projectConfig = require('./public/project-config')

module.exports = config => {
  if (projectConfig.PROJECT_TYPE === 'apps') {
    // config.target = 'electron-renderer'
  }

  return config
}