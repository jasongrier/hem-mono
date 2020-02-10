const { join } = require('path')
const { existsSync, readdirSync, lstatSync } = require('fs')

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
  'favicon.ico',
  'index.html',
  'index.tsx',
  'README.md',
  'tasks.js',
  'TODO.md',
]

const expectedComponentsFiles = [
  'index.ts',
]

const expectedSubcomponentsFiles = [
  'index.ts',
]

const expectedFunctionsFiles = [
  'index.ts',
]

const expectedHooksFiles = [
  'index.ts',
]

const expectedModulesFiles = [
  'app',
  'another',
]

const expectedModuleFiles = [
  'components',
  'actions.ts',
  'index.ts',
  'reducer.ts',
  'selectors.ts',
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

const disallowedFiles = [
  '.gitkeep',
]

function getProjectDir(projectName) {
  return join(__dirname, '..', '..', '..', 'projects', projectName)
}

function lintProjectFiles(projectName) {
  const projectDir = getProjectDir(projectName)

  lintFiles(projectName, '.', expectedProjectFiles)
  lintFiles(projectName, 'components', expectedComponentsFiles, false)

  if (existsSync(join(projectDir, 'components', 'App.tsx'))) {
    console.log(`!!!! Sorry ${projectName}, seems like you have an App.tsx in your components folder`)
  }

  lintFiles(projectName, 'functions', expectedFunctionsFiles, false)
  lintFiles(projectName, 'hooks', expectedHooksFiles, false)
  foldersOnly(projectName, join(projectDir, 'modules'))
  lintFiles(projectName, 'modules', expectedModulesFiles, false)

  readdirSync(join(projectDir, 'modules')).forEach(fileName => {
    if (ignoredFiles.includes(fileName)) return
    lintFiles(projectName, join('modules', fileName), expectedModuleFiles)
  })

  readdirSync(join(projectDir, 'modules')).forEach(fileName => {
    if (ignoredFiles.includes(fileName)) return
    lintFiles(projectName, join('modules', fileName, 'components'), expectedSubcomponentsFiles, false)

    if (
      fileName === 'app'
      && !existsSync(join(projectDir, 'modules', 'app', 'components', 'App.tsx'))
    ) {
      console.log(`!!!! Sorry ${projectName}, seems like you are missing App.tsx in your app module`)
    }
  })

  foldersOnly(projectName, join(projectDir, 'routes'))
  lintFiles(projectName, 'static', expectedStaticFiles, false)
  lintFiles(projectName, 'styles', expectedStylesFiles, false)
  lintFiles(projectName, 'tests', expectedTestsFiles, false)
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
  const projectDir = getProjectDir(projectName)

  const expectedFilesFound = []
  const ignoredFilesFound = []
  const unexpectedFilesFound = []
  const disallowedFilesFound = []

  readdirSync(join(projectDir, checkDir)).forEach(fileName => {
    if (expectedFiles.includes(fileName)) {
      expectedFilesFound.push(fileName)
    }

    else if (ignoredFiles.includes(fileName)) {
      ignoredFilesFound.push(fileName)
    }

    else if (disallowedFiles.includes(fileName)) {
      disallowedFilesFound.push(fileName)
    }

    else {
      unexpectedFilesFound.push(fileName)
    }
  })

  reportExpectedFiles(projectName, checkDir, expectedFiles, expectedFilesFound)
  reportDisallowedFiles(projectName, checkDir, disallowedFiles, disallowedFilesFound)
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

function reportDisallowedFiles(projectName, checkDir, disallowedFiles, disallowedFilesFound) {
  if (disallowedFilesFound.length) {
    disallowedFiles.forEach(fileName => {
      if (disallowedFilesFound.indexOf(fileName) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are have a disallowed ${fileName} in ${checkDir}`)
      }
    })
  }
}

function reportUnexpectedFiles(projectName, unexpectedFilesFound) {
  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach((fileName, i) => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${fileName} where it does not belong`)
    })
  }
}

module.exports = { lintProjectFiles }
