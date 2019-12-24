const { execSync } = require('child_process')
const { join } = require('path')
const { readFileSync } = require('fs')

function midstWidgetPostBuild() {
  // Copy Midst Widget build to a custom working directory
  const distDir = join(__dirname, '..', '..', 'dist')
  const midstDistDir = join(__dirname, '..', '..', 'midst-widget')

  execSync(`rm -rf ${midstDistDir}`, { stdio: 'inherit' })
  execSync(`mkdir ${midstDistDir}`, { stdio: 'inherit' })

  // Move the main files and remove Parcel's filename hashes
  const cssFilenameRaw = '../midst-press/components/midst-player-hack/style.css'
  const manifestFile = 'parcel-manifest.json'
  const manifest = JSON.parse(readFileSync(join(distDir, manifestFile)))
  const mainJsFile = manifest['index.ts'].replace(/\.([a-z0-9]+)\./g, '.').replace(/^\//, '')
  const mainCssFile = manifest[cssFilenameRaw].replace(/\.([a-z0-9]+)\./, '.').replace(/^\//, '')

  execSync(`mv ${distDir}${manifest['index.ts']} ${midstDistDir}/${mainJsFile}`, { stdio: 'inherit' })
  execSync(`mv ${distDir}${manifest[cssFilenameRaw]} ${midstDistDir}/${mainCssFile}`, { stdio: 'inherit' })
  execSync(`mkdir ${midstDistDir}/static`, { stdio: 'inherit' })
  execSync(`mkdir ${midstDistDir}/static/assets`, { stdio: 'inherit' })
  execSync(`mkdir ${midstDistDir}/static/workers`, { stdio: 'inherit' })
  execSync(`mkdir ${midstDistDir}/static/scripts`, { stdio: 'inherit' })
  execSync(`mv ${distDir}/static/assets/midst-loading.svg ${midstDistDir}/static/assets/midst-loading.svg`, { stdio: 'inherit' })
  execSync(`mv ${distDir}/static/workers/deflate.js ${midstDistDir}/static/workers/deflate.js`, { stdio: 'inherit' })
  execSync(`mv ${distDir}/static/workers/inflate.js ${midstDistDir}/static/workers/inflate.js`, { stdio: 'inherit' })
  execSync(`mv ${distDir}/static/workers/z-worker.js ${midstDistDir}/static/workers/z-worker.js`, { stdio: 'inherit' })
  execSync(`mv ${distDir}/static/scripts/zip.js ${midstDistDir}/static/scripts/zip.js`, { stdio: 'inherit' })

  execSync(`zip -r midst-widget.zip midst-widget`, { stdio: 'inherit' })
  execSync(`rm -rf ${distDir}`, { stdio: 'inherit' })
  execSync(`mkdir ${distDir}`, { stdio: 'inherit' })
  execSync(`mv midst-widget.zip ${distDir}/midst-widget.zip`, { stdio: 'inherit' })
  execSync(`rm -rf ${midstDistDir}`, { stdio: 'inherit' })
}

module.exports = {
  preBuild: [],
  postBuild: [
    midstWidgetPostBuild,
  ],
}
