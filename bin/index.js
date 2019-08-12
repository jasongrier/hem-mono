const { execSync } = require('child_process')
const { PROJECT_TYPE } = require('../.project.config')
const testApp = require('./test-app')
const testSite = require('./test-site')

execSync('rm -rf dist')
execSync('rm -rf build')

let startCmd
let buildCmd

if (PROJECT_TYPE === 'sites') {
  startCmd = 'rescripts start'
  buildCmd = 'rescripts build'
}

else if (PROJECT_TYPE === 'apps') {
  startCmd = 'nf start -p 3000'
  buildCmd = 'rescripts build && electron-builder'
}

else {
  throw new Error('Bad PROJECT_TYPE in .project.config')
}

switch (process.argv[2]) {
  case 'start':
    execSync(startCmd, { stdio: 'inherit' })
    break

  case 'build':
    execSync(buildCmd, { stdio: 'inherit' })
    break

  case 'test':
      if (PROJECT_TYPE === 'sites') {
        testSite()
      }

      else if (PROJECT_TYPE === 'apps') {
        testApp()
      }
    break
}
