const webpack = require('webpack')
const { PROJECT_TYPE, PROJECT_NAME } = require('./.project.config')

module.exports = config => {
  if (PROJECT_TYPE === 'apps') {
    config.target = 'electron-renderer'
  }

  if (!config.plugins) {
    config.plugins = []
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      DONT_HIDE_TESTS_FROM_CRA_TSC: JSON.stringify(false),
      PROJECT_TYPE: JSON.stringify(PROJECT_TYPE),
      PROJECT_NAME: JSON.stringify(PROJECT_NAME),
    })
  )

  return config
}
