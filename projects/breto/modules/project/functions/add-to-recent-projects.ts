import { find } from 'lodash'
import { IProject } from '../'

function addToRecentProjects(project: IProject) {
  const { remote } = window.require('electron')
  const { app } = remote
  const { join } = remote.require('path')
  const { existsSync, readFileSync, writeFileSync } = remote.require('fs')

  const preferencesFile = join(app.getPath('userData'), 'breto.json')

  if (!existsSync(preferencesFile)) {
    writeFileSync(preferencesFile, JSON.stringify({}, null, 2))
  }

  let preferences = JSON.parse(readFileSync(preferencesFile, 'utf8'))

  if (!preferences.recentProjects) {
    preferences.recentProjects = []
  }

  else if (!find(preferences.recentProjects, { id: project.id })) {
    if (preferences.recentProjects.length === 5) {
      preferences.recentProjects = preferences.recentProjects.splice(0, 4)
    }

    preferences.recentProjects.unshift({
      fullPath: project.fullPath,
      id: project.id,
      title: project.title,
    })
  }

  writeFileSync(preferencesFile, JSON.stringify(preferences, null, 2))
}

export default addToRecentProjects
