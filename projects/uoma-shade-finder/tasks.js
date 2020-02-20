const { execSync } = require('child_process')
const { join } = require('path')
const { readFileSync } = require('fs')

function uomaPostBuild() {
  // Copy Uoma Widget build to a custom working directory
  const distDir = join(__dirname, '..', '..', 'dist')
  const uomaDistDir = join(__dirname, '..', '..', 'uoma-widget-dist')

  execSync(`rm -rf ${uomaDistDir}`, { stdio: 'inherit' })
  execSync(`mkdir ${uomaDistDir}`, { stdio: 'inherit' })

  // Move the main files and remove Parcel's filename hashes
  const manifestFile = 'parcel-manifest.json'
  const manifest = JSON.parse(readFileSync(join(distDir, manifestFile)))
  const mainJsFile = manifest['index.tsx'].replace(/\.([a-z0-9]+)\./g, '.').replace(/^\//, '')
  const mainCssFile = manifest['styles/app.css'].replace(/\.([a-z0-9]+)\./, '.').replace(/^\//, '')

  execSync(`mv ${distDir}${manifest['index.tsx']} ${uomaDistDir}/${mainJsFile}`, { stdio: 'inherit' })
  execSync(`mv ${distDir}${manifest['styles/app.css']} ${uomaDistDir}/${mainCssFile}`, { stdio: 'inherit' })

  execSync(`rm -rf ${distDir}`, { stdio: 'inherit' })
  execSync(`mv ${uomaDistDir} ${distDir}`, { stdio: 'inherit' })
}

module.exports = {
  preBuild: [],
  postBuild: [
    uomaPostBuild,
  ],
}
