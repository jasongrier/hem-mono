const { execSync } = require('child_process')
const { PROJECT_TYPE, PROJECT_NAME } = require('../.project.config')

const testPattern = `src/${PROJECT_TYPE}/${PROJECT_NAME}/**/test.js`

execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
