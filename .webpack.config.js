const webpack = require('webpack')
const projectConfig = require('./public/project-config')

module.exports = config => {
  if (projectConfig.PROJECT_TYPE === 'apps') {
    config.target = 'electron-renderer'
  }

  if (!config.plugins) {
    config.plugins = []
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      DONT_HIDE_TESTS_FROM_CRA_TSC: JSON.stringify(false)
    })
  )

  return config
}
