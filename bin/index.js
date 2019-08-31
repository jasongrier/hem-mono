const { join } = require('path')
const { readFileSync, writeFileSync, existsSync, readdirSync, statSync } = require('fs')
const { execSync } = require('child_process')
const testSite = require('./test-site')
const testApp = require('./test-app')
const { lintFiles, lintMultipleProjects } = require('./lint-files')

const TASK = process.argv[2]
const PROJECT_TYPE = process.argv[3]
const PROJECT_NAME = process.argv[4]
const projects = join(__dirname, '..', 'src', 'projects')

if (TASK !== 'lint') {
  process.env.PROJECT_PATH = join(projects, PROJECT_TYPE + 's', PROJECT_NAME)
}

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
  startCmd = 'nf start -w -p 1234'
  buildCmd =
    'parcel build src/index.html --public-url ./'
    + ' && mv dist build'
    + ' && cp src/projects/apps/electron.js build/electron.js'
    + ' && cp project.config.js build/project.config.js'
    + ' && electron-builder'
}

else if (PROJECT_TYPE !== 'all') {
  throw new Error(`Bad PROJECT_TYPE given: ${PROJECT_TYPE}`)
}

switch (TASK) {
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

  case 'lint':
    if (PROJECT_TYPE === 'all') {
      lintMultipleProjects('app', join(projects, 'apps'))
      lintMultipleProjects('site', join(projects, 'sites'))
    }

    else {
      lintFiles(PROJECT_TYPE, PROJECT_NAME)
    }

    break
}
