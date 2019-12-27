const { execSync } = require('child_process')
const { join } = require('path') // TODO: Group alphabetize all imports
const { readdirSync, readFileSync, writeFileSync } = require('fs')
const parseFrontMatter = require('front-matter')

function build(projectName, andStart = false, developmentBuild = false) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })

  buildContent(projectName)

  runPreBuildTasks(projectName, andStart)

  if (andStart) {
    execSync(`parcel projects/${projectName}/index.html`, { stdio: 'inherit' })
  }

  else {
    execSync(`${developmentBuild ? 'NODE_ENV=development ' : ''}parcel build projects/${projectName}/index.html`, { stdio: 'inherit' })
  }

  runPostBuildTasks(projectName, andStart)
}

function buildContent(projectName) {
  const contentDir = join(__dirname, '..', '..', 'projects', projectName, 'static', 'content')
  const contentFileNames = readdirSync(contentDir).filter(
    filename => filename.match(/\.md$/, '')
  )

  if (!contentFileNames.length) return

  const outputDir = join(__dirname, '..', '..', 'dist', 'static', 'content', 'compiled')

  execSync(`mkdir ${outputDir}`)

  const index = []

  for (let i = 0; i < contentFileNames.length; i ++) {
    const fileName = contentFileNames[i]
    const fileContent = readFileSync(join(contentDir, fileName), 'utf8')
    const fileData = parseFrontMatter(fileContent, { content: true })
    const indexData = {
      ...fileData.attributes,
      url: `/static/content/compiled/${fileName}.json`,
    }

    index.push(indexData)

    writeFileSync(
      join(outputDir, fileName.replace(/md$/, 'json')),
      JSON.stringify({
        ...indexData,
        body: fileData.body,
      })
    )
  }

  writeFileSync(join(outputDir, 'index.json'), JSON.stringify(index))
}

function runTasks(projectName, isStartup, preBuild) {
  const tasksFile = join(__dirname, '..', '..', 'projects', projectName, 'tasks.js')
  const tasks = require(tasksFile)[(preBuild ? 'preBuild' : 'postBuild')]

  if (!tasks || !tasks.length) return

  for (let i = 0; i < tasks.length; i ++) {
    tasks[i](isStartup)
  }
}

function runPreBuildTasks(...args) {
  runTasks(...args, true)
}

function runPostBuildTasks(...args) {
  runTasks(...args, false)
}


module.exports = build
