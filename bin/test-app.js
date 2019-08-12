const { execSync } = require('child_process')
const { PROJECT_TYPE, PROJECT_NAME } = require('../.project.config')

function testApp() {
  const testPattern = `src/${PROJECT_TYPE}/${PROJECT_NAME}/**/test.js`
  execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
}

module.exports = testApp
