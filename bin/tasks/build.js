const Bundler = require('parcel-bundler')
const lazyRequire = require('lazy-require')
const { execSync, spawn } = require('child_process')
const { writeFileSync } = require('fs')
const { join } = require('path')
const puppeteer = require('puppeteer')

async function generateLandingPage() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:1234', { waitUntil: 'networkidle0' })
  const html = await page.content()
  writeFileSync(join(__dirname, '..', '..', 'dist', 'index.html'), html)
  browser.close()
  process.exit()
}

function copyStatic(projectName) {
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })
}

function build(projectName) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  copyStatic(projectName)
  execSync('rm -rf .cache')

  runPreBuildTasks(projectName)

  const devSession = process.env.NODE_ENV !== 'production'
  const bundler = new Bundler(`${__dirname}/../../projects/${projectName}/index.jade`)

  if (devSession) {
    const env = Object.create(process.env)
    env.ELECTRON_MONO_DEV = true

    const electronProcess = spawn('electron', ['lib/electron/main.js'], {
      shell: true,
      detached: true,
      env,
    })

    process.on('SIGINT', function() {
      electronProcess.kill()
    })

    bundler.on('buildEnd', () => {
      copyStatic(projectName)
      runPostBuildTasks(projectName, devSession, false)
    })

    bundler.serve()
  }

  else {
    bundler.on('bundled', () => {
      copyStatic(projectName)
      runPostBuildTasks(projectName, devSession, false)
      generateLandingPage()
    })

    bundler.serve()
  }
}

function runTasks(projectName, devSession, taskType, isStartup) {
  const tasksFile = join(__dirname, '..', '..', 'projects', projectName, 'tasks.js')
  const allTasks = lazyRequire(tasksFile)
  const tasks = allTasks[taskType]

  if (!tasks || !tasks.length) return

  for (let i = 0; i < tasks.length; i ++) {
    tasks[i](devSession, isStartup)
  }
}

function runPreBuildTasks(projectName, devSession) {
  runTasks(projectName, devSession, 'preBuild')
}

function runPostBuildTasks(projectName, devSession, isStartup) {
  runTasks(projectName, devSession, 'postBuild', isStartup)
}

module.exports = build
