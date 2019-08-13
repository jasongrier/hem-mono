const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { execSync } = require('child_process')
const { PROJECT_TYPE, PROJECT_NAME } = require('../project.config')

execSync('rm -rf .cache && rm -rf dist')

let startCmd
let buildCmd

if (PROJECT_TYPE === 'site') {
  startCmd = 'parcel src/index.html'
  buildCmd = ''
}

else if (PROJECT_TYPE === 'app') {
  startCmd = 'nf start -p 3000'
  buildCmd = 'rescripts build && electron-builder'
}

else {
  throw new Error(`Bad PROJECT_TYPE in .project.config: ${PROJECT_TYPE}`)
}

writeFileSync(join(__dirname, '..', 'src', 'index.ts'),
  readFileSync(join(__dirname, 'entry-template'), { encoding: 'utf8' })
    .replace('<% PROJECT_PATH %>', `./projects/${PROJECT_TYPE}s/${PROJECT_NAME}`)
)

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
