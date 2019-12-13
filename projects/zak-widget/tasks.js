const { execSync } = require('child_process')
const { extname, join } = require('path')
const { readdirSync, readFileSync } = require('fs')

function helloWorld() {
  // Copy Zak Widget build to a custom working directory
  const distDir = join(__dirname, '..', '..', 'dist')
  const zakDistDir = join(__dirname, '..', '..', 'zak-widget-dist')

  execSync(`rm -rf ${zakDistDir}`, { stdio: 'inherit' })
  execSync(`mkdir ${zakDistDir}`, { stdio: 'inherit' })

  // Move the main files and remove Parcel's filename hashes
  const manifestFile = 'parcel-manifest.json'
  const manifest = JSON.parse(readFileSync(join(distDir, manifestFile)))
  const mainJsFile = manifest['index.ts'].replace(/\.([a-z0-9]+)\./g, '.').replace(/^\//, '')
  const mainCssFile = manifest['index.css'].replace(/\.([a-z0-9]+)\./, '.').replace(/^\//, '')

  execSync(`mv ${distDir}${manifest['index.ts']} ${zakDistDir}/zw-${mainJsFile}`, { stdio: 'inherit' })
  execSync(`mv ${distDir}${manifest['index.css']} ${zakDistDir}/zw-${mainCssFile}`, { stdio: 'inherit' })
}

module.exports = {
  preBuild: [],
  postBuild: [
    helloWorld,
  ],
}
