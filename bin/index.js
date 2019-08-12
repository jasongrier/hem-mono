const { PROJECT_TYPE, PROJECT_NAME } = require('../.project.config')

switch (process.argv[2]) {
  case 'start':
    start()
    break

  case 'build':
    test()
    break

  case 'test':
    compile()
    break
}
