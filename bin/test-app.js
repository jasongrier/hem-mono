const { execSync } = require('child_process')
const projectConfig = require('../public/project-config')

const testPattern = `test/${projectConfig.PROJECT_TYPE}/${projectConfig.PROJECT_NAME}/**/*.test.js`

execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
