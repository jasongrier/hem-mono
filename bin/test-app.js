const { execSync } = require('child_process')

function testApp(PROJECT_NAME) {
  console.log('Starting app tests...')

  process.env.ELECTRON_TEST = true

  execSync(`mv ${__dirname}/../src/projects/apps/electron.js ${__dirname}/../src/projects/apps/index.js`)
  execSync(`parcel build src/index.html --public-url ./ && mocha -p tsconfig.json src/projects/apps/${PROJECT_NAME}/tests/**/*.test.js`, { stdio: 'inherit' })
  execSync(`mv ${__dirname}/../src/projects/apps/index.js ${__dirname}/../src/projects/apps/electron.js`)
}

module.exports = testApp
