const { execSync } = require('child_process')
const doAll = require('../helpers/do-all')

function todo(projectName) {
  execSync(`node_modules/.bin/leasot -x -r markdown projects/${projectName}/**/*.ts projects/**/*.tsx projects/${projectName}/**/*.css > projects/${projectName}/TODO.md`, { stdio: 'inherit' })
}

function todoAll(inCi = false) {
  if (inCi) {
    // TODO: How to handle TODO's in CI?
  }

  else {
    doAll(todo)
    execSync(`node_modules/.bin/leasot -x -r markdown bin/**/*.js projects/**/*.ts projects/**/*.tsx projects/**/*.css > TODO.md`, { stdio: 'inherit' })
  }
}

module.exports = { todo, todoAll }
