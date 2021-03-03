const { readFileSync } = require('fs')
const { join } = require('path')
const pug = require('pug')
const Mustache = require('mustache')
const config = require('./config')

const pugIncludesPath = join(__dirname, 'static', 'html')
const settings = JSON.parse(readFileSync(join(__dirname, 'static', 'content', 'settings.json'), 'utf8'))
const projectSetting = settings.find(s => s.bg === 'setting-current-project')
const projectName = projectSetting.aj
const projectConfig = config.PROJECT_CONFIGS[projectName]
const landingPageArgIndex = process.argv.findIndex(a => a === '-landing-page')

let headMeta

if (landingPageArgIndex > -1) {
  const landingPageName = process.argv[landingPageArgIndex + 1]
  const landingPageConfig = projectConfig.LANDING_PAGES.find(l => l.name === landingPageName)

  headTagsPath = join(pugIncludesPath, projectName, 'head-tags-' + landingPageName + '.html')
  headMeta = landingPageConfig.HTML_HEAD_META
}

else {
  headTagsPath = join(pugIncludesPath, projectName, 'head-tags.html')
  headMeta = projectConfig.HTML_HEAD_META
}
const headTagsTpl = readFileSync(headTagsPath, 'utf8')
const headTags = Mustache.render(headTagsTpl, {
  title: headMeta.BASE_SITE_TITLE,
  description: headMeta.META_DESCRIPTION,
})

module.exports = {
  locals: {
    headTags,
  },
}
