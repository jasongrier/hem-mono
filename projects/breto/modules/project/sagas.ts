import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  NEW_PROJECT,
  OPEN_PROJECT,
  SAVE_PROJECT,

  loadProject as loadProjectAc,

  IProject,

  createProject,
} from './index'

declare const window: any

function* newProject() {
  try {
    const { remote } = window.require('electron')
    const { mkdirSync, writeFileSync } = remote.require('fs')
    const fullPath = remote.dialog.showSaveDialogSync(null)
    const title = fullPath.split('/').pop()
    const project = createProject(title, fullPath)

    mkdirSync(fullPath)
    mkdirSync(fullPath + '/' + 'Audio')
    writeFileSync(fullPath + '/' + title + '.breto', JSON.stringify(project, null, 2))

    yield put(loadProjectAc(project))
  }

  catch (err) {
    console.log(err)
  }
}

function* openProject() {
  try {
    // const project: IProject = {
    //   title: '',
    //   fullPath: '',
    // }

    // yield put(loadProjectAc(project))
  }

  catch (err) {
    console.log(err)
  }
}

function* saveProject({ payload: project }: any) {
  try {
    yield put(loadProjectAc(project))
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* projectSaga() {
  yield takeLatest(NEW_PROJECT, newProject)
  yield takeLatest(OPEN_PROJECT, openProject)
  yield takeLatest(SAVE_PROJECT, saveProject)
}

export {
  projectSaga,
}
