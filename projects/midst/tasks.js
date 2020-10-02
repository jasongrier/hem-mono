const { execSync } = require('child_process')
const { join } = require('path')
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { RELEASE_PHASE, BERLIN_STOCK_PHOTOS } = require(join(__dirname, 'config'))

function postBuild(devSession) {
  if (!devSession) {
  }
}

module.exports = {
  preBuild: [],
  postBuild: [
    postBuild,
  ],
}
