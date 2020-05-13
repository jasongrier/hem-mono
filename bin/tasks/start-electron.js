const build = require('./build')

function start(projectName, pug) {
  build(projectName, 'electron', false, pug)
}

module.exports = start
