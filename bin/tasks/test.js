const { spawn } = require('child_process')
const { execSync } = require('child_process')
const onStart = require('../helpers/on-start')

async function test(PROJECT_NAME) {
  const devProcess = spawn('npm start', [], { shell: true, detached: true })

  onStart(function() {
    try {
      const testPattern = `${__dirname}/../src/projects/${PROJECT_NAME}/tests/*.test.js`
      execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
    }

    catch(err) {
      console.log(err)
      process.exit()
    }

    process.kill(-devProcess.pid)
    process.exit()
  })
}

module.exports = test
