const build = require('./build')

function start(projectName, pug) {
  build(projectName, true, false, pug)
}

module.exports = start
