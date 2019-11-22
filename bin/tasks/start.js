const { execSync } = require('child_process')

function start(projectName) {
  execSync(`parcel projects/${projectName}/index.html`, { stdio: 'inherit' })
}

module.exports = start
