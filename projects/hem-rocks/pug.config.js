const config = require('./config')
const { readFileSync } = require('fs')
const { join } = require('path')

const projectNameToTitle = {
  'jag.rip': 'JAG',
  'hem.rocks': 'HEM',
}

const settings = JSON.parse(readFileSync(join(__dirname, 'static', 'content', 'settings.json')))
const project = settings.find(s => s.bg === 'setting-current-project')
const vanillaTitleAndDescription = projectNameToTitle[project.aj]

module.exports = {
  locals: {
    title: vanillaTitleAndDescription,
    description: vanillaTitleAndDescription,
  }
}
