const { join } = require('path')
const { readdirSync } = require('fs')
const doAll = require('../helpers/do-all')

const expectedProjectFiles = [
  'assets',
  'classes',
  'components',
  'data',
  'functions',
  'hooks',
  'routes',
  'static',
  'store',
  'tests',
  'workers',

  'index.css',
  'index.html',
  'index.ts',
  'README.md',
  'TODO.md',
]

const expectedComponentsFiles = [
  'actions.ts',
  'index.ts',
  'reducer.ts',
  'selectors.ts',
  'types.ts',
]

const expectedStoreFiles = [
  'actions.ts',
  'index.ts',
  'reducer.ts',
  'selectors.ts',
  'types.ts',
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

  readdirSync(dir).forEach(filepath => {
    if (expectedFiles.indexOf(filepath) > -1) {
      expectedFilesFound.push(filepath)
    }

    else if (ignoredFiles.indexOf(filepath) > -1) {
      ignoredFilesFound.push(filepath)
    }

    else {
      unexpectedFilesFound.push(filepath)
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

  lintFiles(join(projectDir, 'store'), expectedStoreFiles)
  evaluateLint(projectName, expectedStoreFiles, 'store/')

  lintFiles(join(projectDir, 'tests'), expectedTestsFiles)
  // TODO: This bypasses checks for, for example, `i-dont-belong.foo`, the correct check should be `requiredFiles`
  evaluateLint(projectName, expectedTestsFiles, 'tests/', false)
}

function evaluateLint(projectName, expectedFiles, prefix, checkUnexpected = true) {
  if (unexpectedFilesFound[0] === '.gitkeep') {
    console.log(`${projectName}${prefix ? '/' + prefix : ''} –– SKIP`)
    return true
  }

  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(filepath => {
      if (expectedFilesFound.indexOf(filepath) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are missing ${prefix}${filepath}`)
      }
    })
  }

  if (checkUnexpected && unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(filepath => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${prefix}${filepath} where it does not belong`)
    })
  }

  if (
    expectedFiles.length === expectedFilesFound.length
    && !unexpectedFilesFound.length
  ) {
    console.log(`${projectName}${prefix ? '/' + prefix : ''} –– OK`)
  }
}

function lint(projectName) {
  lintProject(projectName)
}

function lintAll() {
  doAll(lint)
}

module.exports = { lint, lintAll }
