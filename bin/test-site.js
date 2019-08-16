// TODO: Probably this whole file should be a custom preset: https://jestjs.io/docs/en/puppeteer#custom-example-without-jest-puppeteer-preset
const { spawn } = require('child_process')
const { execSync } = require('child_process')
const catchWebapp = require('./catch-webapp')
const { PROJECT_NAME } = require('../project.config')

async function testSite() {
  const devProcess = spawn('npm start', [], { shell: true, detached: true })

  catchWebapp(function() {
    try {
      const testPattern = `${__dirname}/../src/projects/sites/${PROJECT_NAME}/tests/*.test.js`
      console.log(`Testing: ${testPattern}`)
      execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
    }

    catch(err) {
      console.log(err)
      process.exit(1)
    }

    process.kill(-devProcess.pid)
    process.exit(0)
  })
}

module.exports = testSite
