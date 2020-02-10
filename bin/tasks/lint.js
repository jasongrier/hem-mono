const { lintProjectFiles } = require('./linters/lint-files')

function lint(projectName) {
  lintProjectFiles(projectName)
}

function lintAll() {
  doAll(lintProjectFiles)
}

module.exports = { lint, lintAll }
