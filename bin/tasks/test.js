const { spawn } = require('child_process')
const { execSync } = require('child_process')
const onStart = require('../helpers/on-start')

function test(projectName, kill = true) {
  const devProcess = spawn('npm start', [], { shell: true, detached: true })

  onStart(function() {
    try {
      const testPattern = `${__dirname}/../src/projects/${projectName}/tests/*.test.js`
      execSync(`mocha -p tsconfig.json ${testPattern}`, { stdio: 'inherit' })
    }

    catch(err) {
      console.log(err)
      process.exit()
    }

    if (kill) {
      process.kill(-devProcess.pid)
      process.exit()
    }
  })
}

const testAll = function() {
  const projects = readdirSync(join(__dirname, '..', '..', 'projects'))

  for (let p = 0; p < projects.length; p ++) {
    const projectName = projects[p]
    if (statSync(join(__dirname, '..', '..', 'projects', projectName)).isDirectory()) {
      test(projectName, false)
    }
  }
}

module.exports = { test, testAll }
