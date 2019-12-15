const { join } = require('path')
const { readdirSync } = require('fs')
const doAll = require('../helpers/do-all')

const expectedProjectFiles = [
  'classes',
  'components',
  'functions',
  'hooks',
  'routes',
  'static',
  'store',
  'tests',

  '.htaccess',
  'config.ts',
  'index.css',
  'index.html',
  'index.ts',
  'README.md',
  'tasks.js',
  'TODO.md',
]

const expectedComponentsFiles = [
  'actions.ts',
  'index.ts',
  'reducer.ts',
  'selectors.ts',
  'types.ts',
]

const expectedRoutesFiles = [
  'Home.tsx',
  'index.ts',
]

const expectedStoreFiles = [
  'actions.ts',
  'index.ts',
  'reducer.ts',
  'sagas.ts',
  'selectors.ts',
  'types.ts',
]

const expectedStaticFiles = [
  'assets',
  'content',
  'data',
  'scripts',
  'workers',
]

const expectedTestsFiles = [
  'app.test.js',
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

let expectedFilesFound = []
let ignoredFilesFound = []
let unexpectedFilesFound = []

function lintFiles(dir, expectedFiles) {
  expectedFilesFound = []
  ignoredFilesFound = []
  unexpectedFilesFound = []

  readdirSync(dir).forEach(filePath => {
    if (expectedFiles.indexOf(filePath) > -1) {
      expectedFilesFound.push(filePath)
    }

    else if (ignoredFiles.indexOf(filePath) > -1) {
      ignoredFilesFound.push(filePath)
    }

    else {
      unexpectedFilesFound.push(filePath)
    }
  })
}

function lintProject(projectName) {
  const projectDir = join(__dirname, '..', '..', 'projects', projectName)

  lintFiles(projectDir, expectedProjectFiles)
  const skip = evaluateLint(projectName, expectedProjectFiles)

  if (skip) return

  lintFiles(join(projectDir, 'store'), expectedComponentsFiles)
  evaluateLint(projectName, expectedComponentsFiles, 'components/')

  lintFiles(join(projectDir, 'routes'), expectedRoutesFiles)
  evaluateLint(projectName, expectedRoutesFiles, 'routes/', false)

  lintFiles(join(projectDir, 'static'), expectedStaticFiles)
  evaluateLint(projectName, expectedStaticFiles, 'static/')

  lintFiles(join(projectDir, 'store'), expectedStoreFiles)
  evaluateLint(projectName, expectedStoreFiles, 'store/')

  lintFiles(join(projectDir, 'tests'), expectedTestsFiles)
  // TODO: This bypasses checks for, for example, `i-dont-belong.foo`, the correct check should be `requiredFiles`
  evaluateLint(projectName, expectedTestsFiles, 'tests/', false)
}

function evaluateLint(projectName, expectedFiles, prefix = '', checkUnexpected = true) {
  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(filePath => {
      if (expectedFilesFound.indexOf(filePath) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are missing ${prefix}${filePath}`)
      }
    })
  }

  if (checkUnexpected && unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(filePath => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${prefix}${filePath} where it does not belong`)
    })
  }

  // if ( // TODO: Verbose flag for this
  //   expectedFiles.length === expectedFilesFound.length
  //   && !unexpectedFilesFound.length
  // ) {
  //   console.log(`${projectName}${prefix ? '/' + prefix : ''} –– OK`)
  // }
}

function lint(projectName) {
  lintProject(projectName)
}

function lintAll() {
  doAll(lint)
}

module.exports = { lint, lintAll }
