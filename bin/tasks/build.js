const { execSync } = require('child_process')

function build(projectName, andStart = false) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })

  if (andStart) {
    execSync(`parcel projects/${projectName}/index.html`, { stdio: 'inherit' })
  }

  else {
    execSync(`parcel build projects/${projectName}/index.html`, { stdio: 'inherit' })
  }
}

module.exports = build
