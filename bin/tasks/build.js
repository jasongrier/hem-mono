const Bundler = require('parcel-bundler')
const lazyRequire = require('lazy-require')
const { execSync, spawn } = require('child_process')
const { join } = require('path')

function copyStatic(projectName) {
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })
}

function build(projectName, devSession = false, developerBuild = false, pug = false) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  copyStatic(projectName)

  runPreBuildTasks(projectName, devSession)

  if (devSession) {
    if (devSession === 'electron') {
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
    }

    const bundler = new Bundler(`${__dirname}/../../projects/${projectName}/index.${pug ? 'pug' : 'html'}`)

    process.env.NODE_ENV = 'development'

    bundler.on('buildEnd', () => {
      copyStatic(projectName)
      runPostBuildTasks(projectName, devSession, false)
    })

    bundler.serve()
  }

  else {
    if (projectName.includes('zak')) {
      execSync(`${developerBuild ? 'NODE_ENV=development ' : 'NODE_ENV=production '}parcel build projects/${projectName}/index.html --no-minify '.'`, { stdio: 'inherit' })
    }

    else {
      execSync(`rm -rf .cache && ${developerBuild ? 'NODE_ENV=development ' : 'NODE_ENV=production '}parcel build projects/${projectName}/index.${pug ? 'pug' : 'html'} '.'`, { stdio: 'inherit' })
    }
  }

  runPostBuildTasks(projectName, devSession, true)
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
