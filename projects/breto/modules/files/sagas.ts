import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  ADD_FOLDER,

  addFiles as addFilesAc,
} from './index'

function* addFolder() {
  try {
    const { remote } = window.require('electron')
    const { readdirSync } = remote.require('fs')
    const { extname } = remote.require('path')
    const paths = remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] })
    const dir = paths[0]
    const files = []

    for (const file of readdirSync(dir)) {
      if (
        extname(file) === '.wav'
        || extname(file) === '.mp3'
      ) {
        files.push(file)
      }
    }

    yield put(addFilesAc(files))
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* filesSaga() {
  yield takeLatest(ADD_FOLDER, addFolder)
}

export {
  filesSaga,
}
