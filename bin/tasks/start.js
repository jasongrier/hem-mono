const build = require('./build')

function start(projectName) {
  build(projectName, true)
}

module.exports = start
