const build = require('./tasks/build')
const { lint, lintAll } = require('./tasks/lint')
const midi = require('./tasks/midi')
const start = require('./tasks/start')
const { test, testAll } = require('./tasks/test')

const a1 = process.argv[2]
const a2 = process.argv[3]
const a3 = process.argv[4]

if (a1 === 'midi') { // `npm start midi`
  midi()
}

else if (a1 === 'test') { // `npm test my-project`
  test(a2)
}

else if (a1 && !a2 && !a3) { // `npm start my-project`
  start(a1)
}

else if (a1 === 'task') {
  switch (a2) {
    case 'build': // `npm run task build my-project`
      build(a3)
      break

    case 'lint': // `npm run task lint my-project`
      lint(a3)
      break

    case 'lint-all': // `npm run task lint-all`
      lintAll()
      break

    case 'test-all': // `npm run task test-all`
      testAll()
      break
  }
}
