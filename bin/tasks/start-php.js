const { execSync } = require('child_process')
const { join } = require('path')

function start(projectName) {
  execSync(`cd ${join(__dirname, '..', '..', 'projects', projectName)} && php -S localhost:2345`)
}

module.exports = start
