const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')
const doAll = require('../helpers/do-all')

const expectedProjectFiles = [
  'components',
  'functions',
  'hooks',
  'modules',
  'routes',
  'static',
  'styles',
  'tests',

  '.htaccess',
  'config.ts',
  'index.html',
  'index.ts',
  'README.md',
  'tasks.js',
  'TODO.md',
]

const expectedFunctionsFiles = [
  'index.ts',
]

const expectedHooksFiles = [
  'index.ts',
]

const expectedModulesFiles = [
  'actions.ts',
  'index.ts',
  'reducer.ts',
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

const expectedStylesFiles = [
  'index.ts',
]

const expectedTestsFiles = [
  'app.test.js',
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

function getProjectDir(projectName) {
  return join(__dirname, '..', '..', 'projects', projectName)
}

function lintProject(projectName) {
  const projectDir = getProjectDir(projectName)

  lintFiles(projectName, projectDir, expectedProjectFiles)

  expectedProjectFiles.forEach((subdir) => {
    foldersOnly(projectName, join(projectDir, subdir))
  })

  readdirSync(join(projectDir, 'modules')).forEach(fileName => {
    if (ignoredFiles.indexOf(fileName)) return
    lintFiles(projectName, join('modules', fileName), expectedModulesFiles)
  })
}

function foldersOnly(projectName, checkDir) {
  const projectDir = getProjectDir(projectName)
  const unexpectedFilesFound = []

  readdirSync(checkDir).forEach(fileName => {
    if (ignoredFiles.indexOf(fileName)) return
    if (!lstatSync(join(projectDir, checkDir, fileName)).isDirectory()) {
      unexpectedFilesFound.push(fileName)
    }
  })

  reportUnexpectedFiles(projectName, unexpectedFilesFound)
}

function lintFiles(projectName, checkDir, expectedFiles, reportUnexpected = true) {
  const expectedFilesFound = []
  const ignoredFilesFound = []
  const unexpectedFilesFound = []

  readdirSync(checkDir).forEach(fileName => {
    if (expectedFiles.indexOf(fileName) > -1) {
      expectedFilesFound.push(fileName)
    }

    else if (ignoredFiles.indexOf(fileName) > -1) {
      ignoredFilesFound.push(fileName)
    }

    else {
      unexpectedFilesFound.push(fileName)
    }
  })

  reportExpectedFiles(projectName, checkDir, expectedFiles, expectedFilesFound)
  reportUnexpected && reportUnexpectedFiles(projectName, unexpectedFilesFound)
}

function reportExpectedFiles(projectName, checkDir, expectedFiles, expectedFilesFound) {
  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(fileName => {
      if (expectedFilesFound.indexOf(fileName) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are missing ${fileName} in ${checkDir}`)
      }
    })
  }
}

function reportUnexpectedFiles(projectName, unexpectedFilesFound) {
  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(fileName => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${fileName} where it does not belong`)
    })
  }
}

function lint(projectName) {
  lintProject(projectName)
}

function lintAll() {
  doAll(lint)
}

module.exports = { lint, lintAll }
