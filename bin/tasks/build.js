const { execSync } = require('child_process')
const { join } = require('path') // TODO: Group alphabetize all imports
const { readdirSync, readFileSync, writeFileSync } = require('fs')
const parseFrontMatter = require('front-matter')

function build(projectName, andStart = false) {
  execSync(`rm -rf dist`, { stdio: 'inherit' })
  execSync(`mkdir dist`, { stdio: 'inherit' })
  execSync(`cp -rf projects/${projectName}/static dist/static`, { stdio: 'inherit' })
  execSync(`cp projects/${projectName}/.htaccess dist/.htaccess`, { stdio: 'inherit' })

  buildContent(projectName)

  runTasks(projectName, andStart)

  if (andStart) {
    execSync(`parcel projects/${projectName}/index.html`, { stdio: 'inherit' })
  }

  else {
    execSync(`parcel build projects/${projectName}/index.html`, { stdio: 'inherit' })
  }
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
      excerpt: fileData.attributes.excerpt,
      tags: fileData.attributes.tags,
      title: fileData.attributes.title,
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

function runTasks(projectName, isStartup) {
  const tasksFile = join(__dirname, '..', '..', 'projects', projectName, 'tasks.js')
  const tasks = require(tasksFile)

  if (!tasks || !tasks.length) return

  for (let i = 0; i < tasks.length; i ++) {
    tasks[i](isStartup)
  }
}

module.exports = build
