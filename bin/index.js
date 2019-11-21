const build = require('./tasks/build')
const lint = require('./tasks/lint')
const midi = require('./tasks/midi')
const start = require('./tasks/start')
const test = require('./tasks/test')

const task = process.argv[2]
let projectName = process.argv[3]

switch (task) {
  case 'build':
    build(projectName)
    break

  case 'lint':
    lint(projectName)
    break

  case 'midi':
    midi()
    break

  case 'test':
    test(projectName)
    break

  default:
    projectName = task
    start(projectName)
}
