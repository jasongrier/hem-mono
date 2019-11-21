const { execSync } = require('child_process')

function build(projectName) {
  execSync(`parcel build projects/${projectName}/index.html`, { stdio: 'inherit' })
}

module.exports = build
