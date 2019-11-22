const { readdirSync, statSync } = require('fs')
const { join } = require('path')

function doAll(task) {
  const projects = readdirSync(join(__dirname, '..', '..', 'projects'))

  for (let p = 0; p < projects.length; p ++) {
    const projectName = projects[p]
    if (statSync(join(__dirname, '..', '..', 'projects', projectName)).isDirectory()) {
      task(projectName)
    }
  }
}

module.exports = doAll
