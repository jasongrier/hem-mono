const build = require('./build')

function start(projectName, pug) {
  build(projectName, 'localhost', false, pug)
}

module.exports = start
