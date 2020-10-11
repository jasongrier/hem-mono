const { lint, lintAll } = require('./tasks/lint')
const { todo, todoAll } = require('./tasks/todo')
const build = require('./tasks/build')
const start = require('./tasks/start')
const startElectron = require('./tasks/start-electron')
const startPhp = require('./tasks/start-php')

const a1 = process.argv[2]
const a2 = process.argv[3]
const a3 = process.argv[4]

if (a1 === 'test') { // `npm test my-project`
  test(a2)
}

else if (a1 && !a2 && !a3) { // `npm start my-project`
  todoAll()
  start(a1)
}

else if (a1 === 'task') { // TODO: Command not found error
  switch (a2) {
    case 'start-pug': // `npm run task start-pug my-project`
      start(a3, true)
      break

    case 'start-pug-electron': // `npm run task start-electron my-project`
      startElectron(a3, true)
      break

    case 'start-php': // `npm run task start-php my-project`
      startPhp(a3)
      break

    case 'build': // `npm run task build my-project`
      build(a3)
      break

    case 'build-pug': // `npm run task build-pug my-project`
      build(a3, false, false, true)
      break

    case 'developer-build': // `npm run task build my-project`
      build(a3, false, true)
      break

    case 'developer-build-pug': // `npm run task build my-project`
      build(a3, false, true)
      break

    case 'lint': // `npm run task lint my-project`
      lint(a3)
      break

    case 'lint-all': // `npm run task lint-all`
      lintAll()
      break

    case 'todo': // `npm run task todo my-project`
      todo(a3)
      break

    case 'todo-all': // `npm run task todo-all`
      todoAll()
      break
  }
}
