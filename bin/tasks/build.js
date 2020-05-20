const Bundler = require('parcel-bundler')
const lazyRequire = require('lazy-require')
const { execSync, spawn } = require('child_process')
const { join } = require('path') // TODO: Group alphabetize all imports

function copyStatic(projectName) {
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })
}

function build(projectName, andStart = false, developerBuild = false, pug = false) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  copyStatic(projectName)

  runPreBuildTasks(projectName, andStart)

  if (andStart) {
    if (andStart === 'electron') {
      const env = Object.create(process.env)
      env.ELECTRON_MONO_DEV = true

      const electronProcess = spawn('electron', ['bin/electron/main.js'], {
        shell: true,
        detached: true,
        env,
      })
    }

    // The CLI way...
    if (projectName.includes('zak')) {
      // TODO: Make this a task parameter, eg: `npm run task start-with-manifest zak-pdp-widget`
      execSync(`parcel projects/${projectName}/index.${pug ? 'pug' : 'html'}`, { stdio: 'inherit' })
    }

    else {
      // TODO: Make programmatic bundler work with parcel-manifests
      const bundler = new Bundler(`${__dirname}/../../projects/${projectName}/index.${pug ? 'pug' : 'html'}`)
      bundler.on('buildEnd', () => {
        copyStatic(projectName)
        runPostBuildTasks(projectName, false)
      })
      bundler.serve()
    }
  }

  else {
    execSync(`${developerBuild ? 'NODE_ENV=development ' : ''}parcel build projects/${projectName}/index.html --no-minify --public-url '.'`, { stdio: 'inherit' })
  }

  runPostBuildTasks(projectName, andStart)
}

function runTasks(projectName, isStartup, taskType) {
  const tasksFile = join(__dirname, '..', '..', 'projects', projectName, 'tasks.js')
  const allTasks = lazyRequire(tasksFile)
  const tasks = allTasks[taskType]

  if (!tasks || !tasks.length) return

  for (let i = 0; i < tasks.length; i ++) {
    tasks[i](isStartup)
  }
}

function runPreBuildTasks(...args) {
  runTasks(...args, 'preBuild')
}

function runPostBuildTasks(...args) {
  runTasks(...args, 'postBuild')
}

module.exports = build
