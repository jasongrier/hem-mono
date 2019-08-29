const { join } = require('path')
const { readdirSync } = require('fs')

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
]

const ignoredFiles = [
  '.',
  '..',
  '.DS_Store',
]

module.exports = function(PROJECT_TYPE, PROJECT_NAME) {
  const project = join(__dirname, '..', 'src', 'projects', PROJECT_TYPE + 's', PROJECT_NAME)
  const expectedFilesFound = []
  const ignoredFilesFound = []
  const unexpectedFilesFound = []

  readdirSync(project).forEach(file => {
    if (expectedFiles.indexOf(file) > -1) {
      expectedFilesFound.push(file)
    }

    else if (ignoredFiles.indexOf(file)) {
      ignoredFilesFound.push(file)
    }

    else {
      unexpectedFilesFound.push(file)
    }
  })

  if (expectedFiles.length !== expectedFilesFound.length) {
    expectedFiles.forEach(file => {
      if (expectedFilesFound.indexOf(file) === -1) {
        console.log(`Sorry ${PROJECT_NAME}, seems like you are missing ${file}.`)
      }
    })
  }

  if (unexpectedFilesFound.length) {
    unexpectedFilesFound.forEach(file => {
      console.log(`Sorry ${PROJECT_NAME}, seems like you have ${file} where it does not belong.`)
    })
  }
}
