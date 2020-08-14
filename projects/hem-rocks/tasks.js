const { execSync } = require('child_process')
const { join } = require('path')
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { RELEASE_PHASE } = require(join(__dirname, 'config'))

function removeHiddenContentFromBuild() {
  const indexDir = join(__dirname, '..', '..', 'dist', 'static', 'content')
  const indexFiles = readdirSync(indexDir)

  for (indexFile of indexFiles) {
    const filePath = join(indexDir, indexFile)
    const data = JSON.parse(readFileSync(filePath, 'utf8'))

    if (data.length) {
      const cleanData = data.filter(item => {
        return item.published && item.releasePhase <= RELEASE_PHASE
      })
      writeFileSync(filePath, JSON.stringify(cleanData, null, 2))
    }

    else {
      if (
        !data.published
        || data.releasePhase > RELEASE_PHASE
      ) {
        execSync(`rm ${filePath}`)
      }
    }
  }
}

function hemPostBuild(devSession) {
  if (!devSession) {
    // removeHiddenContentFromBuild()
  }
}

module.exports = {
  preBuild: [],
  postBuild: [
    hemPostBuild,
  ],
}
