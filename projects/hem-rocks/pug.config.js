const { readFileSync } = require('fs')
const { join } = require('path')
const config = require('./config')

const projectSetting = JSON.parse(readFileSync(join(__dirname, 'static', 'content', 'settings.json')))
const project = projectSetting.find(s => s.bg === 'setting-current-project')
const projectConfig = config.PROJECT_CONFIGS[project.aj]

let headMeta

if (process.argv[5]) {
  if (process.argv[5].indexOf('landing-page-') === -1) {
    throw new Error('Argv #7 must begin with "landing-page-"')
  }

  console.log(project)

  const landingPageName = process.argv[5].replace('landing-page-', '')
  const landingPageConfig = projectConfig.LANDING_PAGES.find(l => l.name === landingPageName)

  headMeta = landingPageConfig.HTML_HEAD_META
}

else {
  headMeta = projectConfig.HTML_HEAD_META
}

module.exports = {
  locals: {
    title: headMeta.BASE_SITE_TITLE,
    description: headMeta.META_DESCRIPTION,
  }
}
