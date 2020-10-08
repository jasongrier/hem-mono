import { call, put, select, takeLatest } from 'redux-saga/effects'
import { addFiles } from '../files'
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_PROJECT,
  RECENT_PROJECTS_REQUEST,
  SAVE_PROJECT,

  loadProject as loadProjectAc,
  recentProjectsLoad as recentProjectsLoadAc,

  IProject,

  createProject,
  addToRecentProjects,
} from './index'

function* loadProject({ payload: project }: any) {
  try {
    yield put(addFiles(project.files))
  }

  catch (err) {
    console.log(err)
  }
}

function* newProject() {
  try {
    const { remote } = window.require('electron')
    const { mkdirSync, writeFileSync } = remote.require('fs')
    const dirPath = remote.dialog.showSaveDialogSync(null)

    if (!dirPath) return

    const title = dirPath.split('/').pop()
    const project = createProject(title, dirPath + '/' + title)

    mkdirSync(dirPath)
    mkdirSync(dirPath + '/' + 'Audio')
    mkdirSync(dirPath + '/' + 'Attachments')
    writeFileSync(dirPath + '/' + title + '.breto', JSON.stringify(project, null, 2))

    yield put(loadProjectAc(project))

    addToRecentProjects(project)
  }

  catch (err) {
    console.log(err)
  }
}

function* openProject() {
  try {
    const { remote } = window.require('electron')
    const { readFileSync } = remote.require('fs')
    const fullPaths = remote.dialog.showOpenDialogSync(null)
    const project: IProject = JSON.parse(readFileSync(fullPaths[0], 'utf8'))

    project.fullPath = fullPaths[0]

    yield put(loadProjectAc(project))

    addToRecentProjects(project)
  }

  catch (err) {
    console.log(err)
  }
}

function* loadRecentProjects() {
  try {
    const { remote } = window.require('electron')
    const { app } = remote
    const { join } = remote.require('path')
    const { existsSync, readFileSync, writeFileSync } = remote.require('fs')

    const preferencesFile = join(app.getPath('userData'), 'breto.json')

    if (existsSync(preferencesFile)) {
      const preferences = JSON.parse(readFileSync(preferencesFile, 'utf8'))

      if (preferences.recentProjects) {
        yield put(recentProjectsLoadAc(preferences.recentProjects))
      }
    }
  }

  catch (err) {
    console.log(err)
  }
}

function* saveProject() {
  try {
    // const { remote } = window.require('electron')
    // const { writeFileSync } = remote.require('fs')
    // const fullPath = project.fullPath

    // writeFileSync(fullPath, JSON.stringify(project, null, 2))

    // yield put(loadProjectAc(project))

    // addToRecentProjects(project)
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* projectSaga() {
  yield takeLatest(LOAD_PROJECT, loadProject)
  yield takeLatest(NEW_PROJECT, newProject)
  yield takeLatest(OPEN_PROJECT, openProject)
  yield takeLatest(RECENT_PROJECTS_REQUEST, loadRecentProjects)
  yield takeLatest(SAVE_PROJECT, saveProject)
}

export {
  projectSaga,
}
