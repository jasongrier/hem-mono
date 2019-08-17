const { join } = require('path')
const { readFileSync, writeFileSync, existsSync } = require('fs')
const { execSync } = require('child_process')
const { PROJECT_TYPE, PROJECT_NAME } = require('../project.config')
const testSite = require('./test-site')
const testApp = require('./test-app')

function cleanUp() {
  console.log('Cleaning up...')

  execSync('rm -rf .cache && rm -rf dist && rm -rf build')

  if (
    !existsSync(`${__dirname}/../src/projects/apps/electron.js`)
    && existsSync(`${__dirname}/../src/projects/apps/index.js`)
  ) {
    execSync(`mv ${__dirname}/../src/projects/apps/index.js ${__dirname}/../src/projects/apps/electron.js`)
  }
}

cleanUp()

writeFileSync(join(__dirname, '..', 'src', 'index.ts'),
  readFileSync(join(__dirname, 'entry-template'), { encoding: 'utf8' })
    .replace('<% PROJECT_PATH %>', `./projects/${PROJECT_TYPE}s/${PROJECT_NAME}`)
)

let startCmd
let buildCmd

if (PROJECT_TYPE === 'site') {
  startCmd = 'parcel src/index.html'
  buildCmd = 'parcel build src/index.html'
}

else if (PROJECT_TYPE === 'app') {
  startCmd = 'nf start -p 1234'
  buildCmd =
    'parcel build src/index.html --public-url ./'
    + ' && mv dist build'
    + ' && cp src/projects/apps/electron.js build/electron.js'
    + ' && electron-builder'
}

else {
  throw new Error(`Bad PROJECT_TYPE in .project.config: ${PROJECT_TYPE}`)
}

switch (process.argv[2]) {
  case 'start':
    execSync(startCmd, { stdio: 'inherit' })
    break

  case 'build':
    execSync(buildCmd, { stdio: 'inherit' })
    break

  case 'test':
      if (PROJECT_TYPE === 'site') {
        testSite()
      }

      else if (PROJECT_TYPE === 'app') {
        testApp()
      }
    break
}
