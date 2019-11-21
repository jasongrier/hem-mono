const { execSync } = require('child_process')

function start(projectName) {
  execSync('mkdir dist', { stdio: 'inherit' })
  execSync(`cp -r projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`parcel projects/${projectName}/index.html`, { stdio: 'inherit' })
}

module.exports = start
