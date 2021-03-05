const { spawn } = require('child_process')
function hemPostBuild() {
}

module.exports = {
  preBuild: [],
  postBuild: [
    hemPostBuild,
  ],
}
