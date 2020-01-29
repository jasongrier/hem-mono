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

const expectedComponentsFiles = [
  'App.tsx',
  'index.ts',
  'Root.tsx'
]

const expectedFunctionsFiles = [
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

const expectedTestsFiles = [
  'app.test.js',
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

function lintProject(projectName) {
  const projectDir = join(__dirname, '..', '..', 'projects', projectName)

  lintFiles(projectName, projectDir, expectedProjectFiles)

  // lintFiles(join(projectDir, 'components'), expectedComponentsFiles)
  // evaluateLint(projectName, expectedModuleFiles, 'components/')

  // lintFiles(join(projectDir, 'routes'), expectedModuleFiles)
  // evaluateLint(projectName, expectedModuleFiles, 'routes/', false)

  // lintFiles(join(projectDir, 'static'), expectedStaticFiles)
  // evaluateLint(projectName, expectedStaticFiles, 'static/')

  // lintFiles(join(projectDir, 'store'), expectedStoreFiles)
  // evaluateLint(projectName, expectedStoreFiles, 'store/')

  // lintFiles(join(projectDir, 'tests'), expectedTestsFiles)
  // // TODO: This bypasses checks for, for example, `i-dont-belong.foo`, the correct check should be `requiredFiles`
  // evaluateLint(projectName, expectedTestsFiles, 'tests/', false)
}

function lintFiles(projectName, checkDir, expectedFiles) {
  const expectedFilesFound = []
  const ignoredFilesFound = []
  const unexpectedFilesFound = []

  readdirSync(checkDir).forEach(filePath => {
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

  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(filePath => {
      if (expectedFilesFound.indexOf(filePath) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are missing ${filePath}`)
      }
    })
  }

  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(filePath => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${filePath} where it does not belong`)
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
