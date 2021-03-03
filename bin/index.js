const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

const compiler = webpack(webpackConfig())

const devServerConfig = {
  compress: true,
  historyApiFallback: true,
  stats: { colors: true },
  disableHostCheck: true,
}

const server = new WebpackDevServer(compiler, devServerConfig)

server.listen(3000, 'localhost')
