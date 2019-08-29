const { join } = require('path')
const { readdirSync, statSync } = require('fs')

const expectedFiles = [
  'assets',
  'classes',
  'components',
  'config.js',
  'data',
  'helpers',
  'hooks',
  'index.css',
  'index.tsx',
  'README.md',
  'routes',
  'store',
  'tests',
  'workers',
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

const lintFiles = function(PROJECT_TYPE, PROJECT_NAME) {
  const project = join(__dirname, '..', 'src', 'projects', PROJECT_TYPE + 's', PROJECT_NAME)
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
    console.log(`Skipping placeholder project: ${PROJECT_TYPE}/${PROJECT_NAME}.`)
    return
  }

  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(filepath => {
      if (expectedFilesFound.indexOf(filepath) === -1) {
        console.log(`!!!! Sorry ${PROJECT_NAME}, seems like you are missing ${filepath}.`)
      }
    })
  }

  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(filepath => {
      console.log(`!!!! Sorry ${PROJECT_NAME}, seems like you have ${filepath} where it does not belong.`)
    })
  }
}

const lintMultipleProjects = function(type, dir) {
  readdirSync(dir).forEach(filepath => {
    if (statSync(join(dir, filepath)).isDirectory()) {
      lintFiles(type, filepath)
    }
  })
}

module.exports = { lintFiles, lintMultipleProjects }
