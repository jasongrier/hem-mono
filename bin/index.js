const { join } = require('path')
const { execSync, spawn } = require('child_process')
const Bundler = require('parcel-bundler')
const env = Object.create(process.env)

const bundler = new Bundler(
  join('.', 'projects', 'hem-rocks', 'index.jade')
)

bundler.on('buildEnd', async () => {
  execSync(`cp -rf ${join('.', 'projects', 'hem-rocks')} ${join('.', 'dist', 'static')}`)
  execSync(`cp ${join('.', 'projects', 'hem-rocks', '.htaccess')} ${join('.', 'dist', '.htaccess')}`)
})

execSync(`rm -rf ${join('.', 'cache')}`)

bundler.serve()

env.ELECTRON_MONO_DEV = true

const electronProcess = spawn('electron', ['bin/electron/main.js'], {
  shell: true,
  detached: true,
  env,
})

process.on('SIGINT', function() {
  electronProcess.kill()
})
