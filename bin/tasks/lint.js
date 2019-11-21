const { join } = require('path')
const { readdirSync } = require('fs')

const expectedFiles = [ // TODO: Lint for files (including selectors) under `store`
  'assets',
  'classes',
  'components',
  'data',
  'functions',
  'hooks',
  'routes',
  'store',
  'tests',
  'workers',

  'index.css',
  'index.html',
  'index.ts',

  'README.md',
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

const lintFiles = function(projectName) {
  const project = join(__dirname, '..', '..', 'projects', projectName)
  const projectFiles = readdirSync(project)

  const expectedFilesFound = []
  const ignoredFilesFound = []
  const unexpectedFilesFound = []

  projectFiles.forEach(filepath => {
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

  if (unexpectedFilesFound[0] === '.gitkeep') {
    console.log(`Skipping placeholder project: ${PROJECT_TYPE}/${projectName}.`)
    return
  }

  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(filepath => {
      if (expectedFilesFound.indexOf(filepath) === -1) {
        console.log(`!!!! Sorry ${projectName}, seems like you are missing ${filepath}.`)
      }
    })
  }

  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(filepath => {
      console.log(`!!!! Sorry ${projectName}, seems like you have ${filepath} where it does not belong.`)
    })
  }
}

function lint(projectName) {
  lintFiles(projectName)
}

module.exports = lint
